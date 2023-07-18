const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING_LOCAL, {
            useNewUrlParser: true,
            // useUnifiedTopology: true,
            // family: 4,
        });
        console.log("Database connected:", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;