const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


const authController = {};

authController.login = async (req, res) => {

    const {
        email,
        password
    } = req.body;
    try {

        let user = await User.findOne({
            email
        })
        if (!user) {
            return res.status(500).json({
                error: true,
                message: "User not registed",
            });

        }

        if (bcrypt.compareSync(password, user.password)) {
            const payload = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(payload, config.get("jwtToken"));
            return res.status(500).json({
                error: true,
                token,
            });

        } else {
            return res.status(200).json({
                error: true,
                message: "Invalid credentials",
            });

        }

    } catch (error) {
        return res.status(500).json({
            error: true,
            data: error.stack,
        });

    }





};

module.exports = authController;