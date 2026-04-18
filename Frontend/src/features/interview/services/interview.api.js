import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});


/**
 * @description 
 */

export const generateInterviewReport = async({ resumeFile, selfDescription, jobDescription }) => {
    const formData = new FormData();

    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);
    formData.append("jobDescription", jobDescription);

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;

}

/**
 * @description
 */

export const getInterviewReportById = async(interviewId) => { 
    const response = await api.get(`/api/interview/${interviewId}`) // Fix route match (backend uses /:interviewId not /report/:id)

    return response.data
}

/**
 * @description
 */

export const getAllInterviewReports = async() => {
    const response = await api.get("/api/interview")

    return response.data
}

/**
 * @description
 */

export const generateResumePdf = async (interviewReportId) => { 
    // Need to specify responseType to appropriately parse the binary blob
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, {}, {
        responseType: 'blob'
    })

    return response.data
}
