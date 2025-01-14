const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

const db = require('./models');
const { movie_review } = require('./models'); // Import the model

(async () => {
    try {
        // Sync the database
        await db.sequelize.sync({ force: true }); // Using `force: true` for a fresh start (optional)
        console.log("Database synced.");

        const { movie_review } = db;

        // Insert data
        const insertedData = await movie_review.create({
            movie_name: "The Matrix",
            movie_review: "A revolutionary sci-fi movie.",
        });

        console.log("Inserted data:", insertedData.toJSON());

        // Retrieve all data
        const allReviews = await movie_review.findAll();
        console.log("All movie reviews:");
        allReviews.forEach(review => {
            console.log(review.toJSON());
        });

    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the database connection
        await db.sequelize.close();
        console.log("Database connection closed.");
    }
})();

// Sync the database and start the server
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('running on port 3001');
    });
});
