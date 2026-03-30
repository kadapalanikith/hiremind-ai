const { Router } = require("express").Router();
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register");

/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */

authRouter.post("/login", authController.loginUserContrller);

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookie and add it to the token blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserContrller);

/**
 * @route GET /api/auth/get-me
 * @description Get the currently logged in user's information
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeContrller,
);

module.exports = authRouter;
