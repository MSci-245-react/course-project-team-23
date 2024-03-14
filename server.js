import express from "express";
import mysql from "mysql";
import cors from "cors";
import "dotenv/config";
import config from "./config.js";

// Create an Express application
const app = express();
const port = process.env.PORT || 5001;

// Apply middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Create a MySQL connection pool
const pool = mysql.createPool(config);

// Add User Endpoint
app.post("/api/addUser", (req, res) => {
  const { uid, email, name } = req.body;
  let weight = 0.0;
  let goals = "";
  const sql = `INSERT INTO user_info (UID, email, name, weight, goals) VALUES (?, ?, ?, ?, ?)`;
  console.log(sql);
  console.log(uid, email, name);
  pool.query(sql, [uid, email, name, weight, goals], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).send({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// Load User Info Endpoint
app.post("/api/loadUserInfo", (req, res) => {
  console.log("loading user info");
  const { uid } = req.body;
  const sql = `SELECT * FROM user_info WHERE UID = ?`;
  console.log(sql);
  console.log("user id ", uid);
  pool.query(sql, [uid], (err, result) => {
    if (err) {
      console.error("Error loading user:", err);
      res.status(500).send({ error: err.message });
    } else {
      console.log("Loading User Result", result);
      res.json(result);
    }
  });
});

// Update User Info Endpoint
app.post("/api/updateUserInfo", (req, res) => {
  console.log("updating user info");
  console.log(req.body);
  const { UID, email, name, weight, goals } = req.body;
  const sql = `UPDATE user_info SET email = ?, name = ?, weight = ?, goals = ? WHERE UID = ?`;

  pool.query(sql, [email, name, weight, goals, UID], (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      res.status(500).send({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// Read Food Ingredients Endpoint
app.get("/api/foodIngredients", (req, res) => {
  const sql = "SELECT * FROM c4desai.food_ingredients_and_allergens";

  pool.query(sql, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.status(500).send({ error: error.message });
    } else {
      res.json(results);
    }
  });
});

// Rate Meal Endpoint
app.post("/api/rateMeal", (req, res) => {
  const { name, rating, created_at } = req.body;
  const sql = "INSERT INTO ratings (name, rating, created_at) VALUES (?, ?, ?)";

  pool.query(sql, [name, rating, created_at], (error, results) => {
    if (error) {
      console.error("Error inserting rating:", error);
      res.status(500).send({ error: error.message });
    } else {
      res.json({ message: "Rating submitted successfully" });
    }
  });
});

async function fetchDistinctColumnValues(pool, columnName, tableName) {
  return new Promise((resolve, reject) => {
    const query = `SELECT DISTINCT ${columnName} FROM ${tableName}`;
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.map((row) => row[columnName.replace(/`/g, "")]));
      }
    });
  });
}

app.get("/api/foodInfo", async (req, res) => {
  console.log("getting food info");
  try {
    const columns = [
      "Main Ingredient",
      "Sweetener",
      "Fat/Oil",
      "Seasoning",
      "Allergens",
      "Calories",
      "Carbs",
      "Fats",
      "Protein",
      "Prep Time",
      "Equipment Needed",
      "Diet Category",
    ];
    const tableName = "c4desai.food_ingredients_and_allergens";
    const results = {};

    for (const column of columns) {
      // For columns with spaces or special characters, wrap them in backticks
      const columnName = `\`${column}\``;
      results[column.includes(" ") ? column.replace(" ", "_") : column] =
        await fetchDistinctColumnValues(pool, columnName, tableName);
    }

    res.json(results);
  } catch (error) {
    console.error("Error querying database:", error);
    res.status(500).send({ error: error.message });
  }
});

app.post("/api/recommendations", (req, res) => {
  console.log("getting recommendations");
  const userInput = req.body; // Assuming this is structured as { allergies: [], diet: [], ingredients: [], foodItems: [] }

  let queryBase =
    "SELECT DISTINCT `Food Product` FROM c4desai.food_ingredients_and_allergens";
  let conditions = [];
  let queryParams = [];

  // Example conditions based on user input. Adjust according to your actual table schema.
  if (userInput.allergies && userInput.allergies.length) {
    conditions.push("`Allergens` NOT IN (?)");
    queryParams.push(userInput.allergies);
  }
  if (userInput.diet && userInput.diet.length) {
    conditions.push("`Diet Category` IN (?)");
    queryParams.push(userInput.diet);
  }
  if (userInput.ingredients && userInput.ingredients.length) {
    conditions.push("`Main Ingredient` IN (?)");
    queryParams.push(userInput.ingredients);
  }

  let query =
    queryBase + (conditions.length ? " WHERE " + conditions.join(" AND ") : "");

  // Execute the query
  pool.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      return res.status(500).send({ error: error.message });
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
