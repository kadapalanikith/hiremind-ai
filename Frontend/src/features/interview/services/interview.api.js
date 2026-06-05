import api from '../../../shared/api';

/**
 * Generate a new interview report by uploading resume PDF, self description, and job description
 */
export const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription || "");
    formData.append("jobDescription", jobDescription);

    const response = await api.post("/api/interview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

/**
 * Get a single interview report by ID
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/${interviewId}`);
    return response.data;
};

/**
 * Get all interview reports for the logged-in user
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview");
    return response.data;
};

/**
 * Generate and download an AI-polished resume PDF
 */
export const generateResumePdf = async (interviewReportId) => {
    const response = await api.post(
        `/api/interview/resume/pdf/${interviewReportId}`,
        {},
        { responseType: 'blob' }
    );
    return response.data;
};
