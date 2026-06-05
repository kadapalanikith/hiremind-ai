const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const interviewController = require('../controllers/interview.controllers');
const upload = require('../middlewares/file.middleware');

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description Generate new interview report based on user's resume, self description, and job description
 * @access Private
 */
interviewRouter.post(
    "/",
    authMiddleware.authUser,
    upload.single("resume"),
    interviewController.generateInterviewReportController
);

/**
 * @route GET /api/interview
 * @description Get all interview reports of logged in user
 * @access Private
 *
 * IMPORTANT: This route MUST be defined before GET /:interviewId
 * Otherwise Express will match "/" as "/:interviewId" and this endpoint becomes unreachable.
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController);

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description Generate and download AI-polished resume PDF
 * @access Private
 *
 * IMPORTANT: This route MUST be defined before GET /:interviewId
 * Otherwise /resume/pdf/:id would match /:interviewId with interviewId="resume"
 */
interviewRouter.post(
    "/resume/pdf/:interviewReportId",
    authMiddleware.authUser,
    interviewController.generateResumePdfController
);

/**
 * @route GET /api/interview/:interviewId
 * @description Get interview report by interviewId (owner only)
 * @access Private
 */
interviewRouter.get("/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportController);

module.exports = interviewRouter;
