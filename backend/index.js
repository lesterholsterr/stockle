const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require('./db')
const port = process.env.PORT || 3001;
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();
const app = express();

// Be able to read body message
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/api/users", require("./routes/userRoutes"));

// Error Handler
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
