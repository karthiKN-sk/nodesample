const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the password"],
    },
},
    { timestamps: true });


module.exports = mongoose.model("User", usersSchema);