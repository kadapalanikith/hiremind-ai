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
    
module.exports = interviewRouter
