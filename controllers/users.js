// const Joi = require("joi");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

const userController = {};
userController.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(500).json({
        error: true,
        message: "User Already Exists",
      });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    const salt = await bcrypt.genSalt(10);

    user = new User({
      name,
      password,
      email,
      avatar,
    });
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, config.get("jwtToken"));

    return res.status(200).json({
      error: false,
      message: "User Registered Succesfully",
      data: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error.stack,
    });
  }
};

module.exports = userController;
