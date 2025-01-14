const express = require('express');
const app = express();
//const { Sequelize } = require('sequelize');
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// const db = require('./models');
// const { movie_review } = require('./models'); // Import the model

// Routers 
const userRouter = require("./routes/User");
app.use("/users", userRouter);

app.listen(3001, () => {
    console.log('running on port 3001');
});

