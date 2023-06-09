const express = require("express");
const connectDB = require('./db')
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;

connectDB();
const app = express();

// Be able to read body messages
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/users", require("./routes/userRoutes"));

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
