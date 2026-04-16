import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});


/**
 * @description 
 */

export const generateInterviewReport = async({ resumeFild, selfDescription, jobDescription }) => {
    const formData = new FormData();

    formData.append("resume", resumeFild);
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
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}

/**
 * @description
 */

export const getAllInterviewReports = async() => {
    const response = await api.get("/api/interview")

    return response.data
}

