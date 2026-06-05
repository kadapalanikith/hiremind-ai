import { useContext, useCallback } from "react";
import { InterviewContext } from "../interview.context";
import {
    getAllInterviewReports,
    generateInterviewReport,
    getInterviewReportById,
    generateResumePdf
} from "../services/interview.api";
import toast from "react-hot-toast";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = useCallback(async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try {
            const data = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(data.interviewReport);
            return data.interviewReport;
        } catch (error) {
            const msg = error.userMessage || 'Failed to generate report. Please try again.';
            toast.error(msg);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    const getReportById = useCallback(async (id) => {
        setLoading(true);
        try {
            const data = await getInterviewReportById(id);
            setReport(data.interviewReport);
            return data.interviewReport;
        } catch (error) {
            const msg = error.userMessage || 'Failed to load report.';
            toast.error(msg);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setReport]);

    const getReports = useCallback(async () => {
        try {
            const data = await getAllInterviewReports();
            setReports(data.interviewReports || []);
        } catch {
            // Non-critical — sidebar may just be empty
            setReports([]);
        }
    }, [setReports]);

    const getResumePdf = useCallback(async (interviewReportId) => {
        const toastId = toast.loading('Generating your AI-polished résumé…');
        try {
            const response = await generateResumePdf(interviewReportId);
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `resume_${interviewReportId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Clean up memory
            toast.success('Résumé downloaded!', { id: toastId });
        } catch (error) {
            const msg = error.userMessage || 'Failed to generate PDF. Please try again.';
            toast.error(msg, { id: toastId });
        }
    }, []);

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf,
    };
};