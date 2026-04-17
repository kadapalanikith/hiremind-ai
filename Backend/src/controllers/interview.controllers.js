const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

/** 
 * @description Generate an interview report based on user description, resume, and job description
 */

async function generateInterviewReportController(req, res) {
    const resumeContent = await pdfParse(req.file.buffer)
    const { selfDescription, jobDescription } = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
}

/**
 * @description Controller to get interview report by interviewId
 */

async function getInterviewReportController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report retrieved successfully",
        interviewReport
    })
}

/**
 * @description controller to get all interview reports of logged in user
 */

async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports retrieved successfully",
        interviewReports
    })
}


/**
 * @description 
 */

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    const { resume, selfDescription, jobDescription } = interviewReport
    
    const pdfBuffer = await generateResumePdf({
        resume,
        selfDescription,
        jobDescription
    })

    res.set({ "Content-Type": "application/pdf","Content-Description":`attachment; filename=resume_${interviewReportId}.pdf`})
    res.send(pdfBuffer)
}

module.exports = { generateInterviewReportController, getInterviewReportController, getAllInterviewReportsController }
