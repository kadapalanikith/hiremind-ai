const { Router } = require("express").Router();
const authController = require("../controllers/auth.controllers");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register");

module.exports = authRouter;
