const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
}); 

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's resume matches the job description, based on the analysis of the content and keywords in both documents."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind asking the technical question"),
        answer: z.string().describe("How to answer this question,what points to cover, and what the interviewer is looking for in the answer,what approach to take etc ."),
    })).describe("Technical questions that can be asked during the interview, along with the intention behind each question and how to answer them effectively."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention behind asking the behavioral question"),
        answer: z.string().describe("How to answer this question,what points to cover, and what the interviewer is looking for in the answer,what approach to take etc ."),
    })).describe("Behavioral questions that can be asked during the interview, along with the intention behind each question and how to answer them effectively."),
    skillGapAnalysis: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to improve in this area."),
    })).describe("List of skills that the candidate is lacking based on the resume and job description, along with an analysis of the severity of each skill gap."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("the day number in the preparation plan, starting from 1 and incrementing for each day"),
        focus: z.string().describe("The specific focus or topic for the candidate to work on during this day of the preparation plan"),
        tasks: z.array(z.string()).describe("A list of specific tasks or activities that the candidate should complete on this day to work on the focus area"),
    })).describe("A preparation plan for the candidate, outlining specific actions they should take to prepare for the interview, along with a list of resources they can use to improve their skills and knowledge in relevant areas."),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `generate an interview report for a candidate based on the following information:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        }
    })

    return JSON.parse(response.text)

}

module.exports = {
    generateInterviewReport
}
