const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome To My Full Stack Development Project");
  } catch (error) {
    res.status(400).send(error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);

    const { username, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "Email Already Exists..!!" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password: hashed_password,
      phone,
    });

    const token = await userCreated.generateToken();
    res.status(200).json({
      message: "Registration Successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(400).send(error);
    // next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const validPassword = await bcrypt.compare(password, userExist.password);

    if (validPassword) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(400).json({ message: "Invalid Credential" });
    }
  } catch (error) {
    res.status(400).send(error);
    // next(error);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

module.exports = { home, register, login, user };