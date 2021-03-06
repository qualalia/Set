const router = require("express").Router();
const { User } = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("No such user found:", req.body.email);
      res.status(401).send("No user with that email.");
    } else if (!user.correctPassword(req.body.password)) {
      console.log("Wrong password for user: ", req.body.email);
      res.status(401).send("Wrong username or password.");
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username = null, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      status: "registered",
    });
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else if (err.name === "SequelizeValidationError") {
      res.status(401).send("Email or password can't be empty");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.use("/google", require("./google"));
