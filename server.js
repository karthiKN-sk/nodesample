const express = require("express");
const connectDb = require("./config/db_connection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contact_routes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running on port', port);
    console.log(port);
});

