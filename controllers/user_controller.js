
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/usersModel");

///@des Register Users
///@route Get /api/users/registor
///@access public
const userRegister = asyncHandler(async (req, res) => {

    console.log("The request body is", req.body);
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    const userAvailable = await user.findOne({
        email
    });
    if (userAvailable) {
        res.status(400).status;
        throw new Error("User Already Register !");
    }
    //Hash Password
    const hashPasword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashPasword);

    const contacts = await user.create({
        userName, email, password: hashPasword
    });

    console.log("User Created:", contacts);
    if (contacts) {
        res.status(201).json({ status: true, message: "Register the User", data: { _id: contacts._id, email: contacts.email, } });

    } else {

        res.status(400);
        throw new Error("User Data Not Valid !");

    }
    res.json({ message: "Register the User" });
});

///@des Login Users
///@route Get /api/users/Login
///@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    const userAvailable = await user.findOne({ email });
    if (userAvailable && (await bcrypt.compare(password, userAvailable.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: userAvailable.userName,
                email: userAvailable.email,
                id: userAvailable.id,
            }
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "2m" });
        res.status(200).json({ message: "Login User", token: accessToken });
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }
    // res.json({ message: "Login User" });
});

///@des Current Users
///@route Get /api/users/Current
///@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current User Information", data: req.user });
});


module.exports = { userRegister, loginUser, currentUser };