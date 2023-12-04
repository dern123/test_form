const Router = require("express");
const router = Router();
const { check } = require("express-validator");
const authController = require("../../controllers/auth/auth.controller");
const passport = require("passport");

router.post("/signup", [check("email", "Invalid data").normalizeEmail().isEmail(), check("password", "Invalid data").exists()], authController.signup);
router.post("/login", [check("email", "Invalid data").normalizeEmail().isEmail(), check("password", "Invalid data").exists()], authController.login);

router.get("/check/session", [passport.authenticate('jwt', {session:false})], authController.checkSession);

module.exports = router;