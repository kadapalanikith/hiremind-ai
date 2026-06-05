const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');
const puppeteer = require('puppeteer');

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

// Use gemini-2.5-flash-lite for cost-effective, fast structured output
const MODEL = "gemini-2.5-flash-lite-preview-06-17";
const MODEL_FALLBACK = "gemini-2.0-flash";

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate's resume matches the job description, based on the analysis of the content and keywords in both documents."),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question asked during the interview"),
        intention: z.string().describe("The intention behind asking the technical question"),
        answer: z.string().describe("How to answer this question: what points to cover, what the interviewer is looking for, what approach to take."),
    })).describe("5-8 technical questions that can be asked during the interview, along with the intention behind each question and how to answer them effectively."),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question asked during the interview"),
        intention: z.string().describe("The intention behind asking the behavioral question"),
        answer: z.string().describe("How to answer this question using STAR method: Situation, Task, Action, Result."),
    })).describe("4-6 behavioral questions that can be asked during the interview, along with the intention behind each question and how to answer them effectively."),
    skillGapAnalysis: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to improve in this area."),
    })).describe("List of skills that the candidate is lacking based on the resume and job description, along with an analysis of the severity of each skill gap."),
    preparationPlan: z.array(z.object({
        day: z.number().describe("the day number in the preparation plan, starting from 1 and incrementing for each day"),
        focus: z.string().describe("The specific focus or topic for the candidate to work on during this day of the preparation plan"),
        tasks: z.array(z.string()).describe("A list of 3-5 specific tasks or activities that the candidate should complete on this day to work on the focus area"),
    })).describe("A 7-14 day preparation plan for the candidate, outlining specific actions they should take to prepare for the interview."),
    title: z.string().describe("A concise title for the interview report, e.g. 'Senior Frontend Engineer @ Stripe'"),
});

async function callGemini(model, contents, config) {
    return ai.models.generateContent({ model, contents, config });
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert career coach and technical interviewer. Analyze the following candidate information and generate a comprehensive interview preparation report.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Generate a detailed, actionable interview report that will help this candidate prepare effectively.`;

    let response;
    try {
        response = await callGemini(MODEL, prompt, {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        });
    } catch (err) {
        // Fallback to stable model if preview not available
        if (err.status === 404 || err.status === 400) {
            response = await callGemini(MODEL_FALLBACK, prompt, {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(interviewReportSchema),
            });
        } else {
            throw err;
        }
    }

    return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        headless: true,
    });
    try {
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

const resumePdfSchema = z.object({
    html: z.string().describe("Complete HTML document for the resume, with all CSS inlined or in a <style> tag. Must be ready to render in a headless browser and produce a professional, ATS-friendly PDF layout.")
});

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const prompt = `You are a professional resume writer. Create an ATS-optimized, visually polished resume in HTML format for the following candidate, tailored to the job description.

Original Resume Content:
${resume}

Candidate Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

Requirements:
- Generate a complete HTML document with all CSS inline or in a <style> tag
- Professional, modern layout with clean typography
- ATS-friendly structure (clear sections, no images/tables for key content)
- Highlight relevant experience and skills matching the job description
- Include all standard sections: Header, Summary, Experience, Skills, Education
- Use a clean color scheme (e.g. white background, dark text, subtle accent color)`;

    let response;
    try {
        response = await callGemini(MODEL, [{ role: "user", parts: [{ text: prompt }] }], {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        });
    } catch (err) {
        if (err.status === 404 || err.status === 400) {
            response = await callGemini(MODEL_FALLBACK, [{ role: "user", parts: [{ text: prompt }] }], {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(resumePdfSchema),
            });
        } else {
            throw err;
        }
    }

    const jsonContext = JSON.parse(response.text);
    const pdfBuffer = await generatePdfFromHtml(jsonContext.html);
    return pdfBuffer;
}

module.exports = {
    generateInterviewReport,
    generateResumePdf
};
