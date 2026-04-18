import { getAllInterviewReports, generateInterviewReport, getInterviewReportById , generateResumePdf} from "../services/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../interview.context"

export const useInterview = () => {
    const context = useContext(InterviewContext)

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const data = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(data.interviewReport)
            return data.interviewReport // returns the newly created report inside the hook
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (id) => {
        setLoading(true)
        try {
            const data = await getInterviewReportById(id)
            setReport(data.interviewReport)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const data = await getAllInterviewReports()
            setReports(data.interviewReports)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getResumePdf = async (interviewReportId) => { 
        setLoading(true)
        try {
            const response = await generateResumePdf(interviewReportId)
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    }
}