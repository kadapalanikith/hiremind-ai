const express = require('express')
const authMiddleWare = require('../middlewares/auth.middleware')
const interviewController = require('../controllers/interview.controllers')
const upload = require('../middlewares/file.middleware')

const interviewRouter = express.Router()


/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description , resume and job description
 * @access private
 */

interviewRouter.post("/",authMiddleWare.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/:interviewId", authMiddleWare.authUser, interviewController.getInterviewReportController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user
 * @access private
 */

interviewRouter.get("/", authMiddleWare.authUser,interviewController.getAllInterviewReportsController)


module.exports = interviewRouter
