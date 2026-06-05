const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @route POST /api/interview
 * @description Generate an interview report based on user description, resume, and job description
 * @access Private
 */
async function generateInterviewReportController(req, res, next) {
    try {
        // Validate required fields
        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF file is required" });
        }

        const { selfDescription, jobDescription } = req.body;

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({ message: "Job description is required" });
        }

        // Parse PDF content
        const resumeContent = await pdfParse(req.file.buffer);

        if (!resumeContent.text || resumeContent.text.trim().length < 50) {
            return res.status(400).json({ message: "Could not extract readable text from the uploaded PDF. Please ensure the resume is a text-based PDF." });
        }

        // Call AI service
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription: selfDescription || "",
            jobDescription,
        });

        // Map skillGapAnalysis from AI to skillGaps in the model
        const { skillGapAnalysis, ...rest } = interviewReportByAi;

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription: selfDescription || "",
            jobDescription,
            skillGaps: skillGapAnalysis,
            ...rest,
        });

        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/interview/:interviewId
 * @description Get interview report by interviewId (only owner can access)
 * @access Private
 */
async function getInterviewReportController(req, res, next) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findById(interviewId);

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        // Authorization: only the owner can access their report (BOLA fix)
        if (interviewReport.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        return res.status(200).json({
            message: "Interview report retrieved successfully",
            interviewReport,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @route GET /api/interview
 * @description Get all interview reports of logged in user
 * @access Private
 */
async function getAllInterviewReportsController(req, res, next) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

        return res.status(200).json({
            message: "Interview reports retrieved successfully",
            interviewReports,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description Generate and download AI-polished resume PDF
 * @access Private
 */
async function generateResumePdfController(req, res, next) {
    try {
        const { interviewReportId } = req.params;

        const interviewReport = await interviewReportModel.findById(interviewReportId);

        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" });
        }

        // Authorization: only the owner can generate PDF for their report
        if (interviewReport.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const { resume, selfDescription, jobDescription } = interviewReport;

        const pdfBuffer = await generateResumePdf({ resume, selfDescription, jobDescription });

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="resume_${interviewReportId}.pdf"`, // Fixed: was Content-Description
            "Content-Length": pdfBuffer.length,
        });

        return res.send(pdfBuffer);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    generateInterviewReportController,
    getInterviewReportController,
    getAllInterviewReportsController,
    generateResumePdfController,
};
