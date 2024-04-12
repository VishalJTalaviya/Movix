const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const validate = require("../middlewares/validate-middlewares");
const { signUpSchema } = require("../validators/auth-validators");
const { loginSchema } = require("../validators/auth-validators");
const authMiddlewares = require("../middlewares/auth-middlewares");

const {home , register , login , user} = require("../controllers/auth-controllers");

// router.route("/").get(authControllers.home);

// router
//   .route("/register")
//   .post(validate(signUpSchema), authControllers.register);

// router.route("/login").post(validate(loginSchema), authControllers.login);

// router.route("/user").get(authMiddlewares, authControllers.user);

router.get("/", (req, res) => {
  home(req, res).catch(err => res.status(400).send(err));
});

router.post("/register", (req, res) => {
  register(req, res).catch(err => res.status(400).send(err));
});

router.post("/login", (req, res) => {
  login(req, res).catch(err => res.status(400).send(err));
});

router.get("/user", (req, res) => {
  user(req, res).catch(err => res.status(400).send(err));
});


module.exports = router;