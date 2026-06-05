const { Router } = require("express");
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route POST /api/auth/logout
 * @description Clear token from user cookie and blacklist it
 * @access Public (uses cookie if present)
 */
authRouter.post("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/me
 * @description Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/me", authMiddleware.authUser, authController.getMeController);

module.exports = authRouter;
