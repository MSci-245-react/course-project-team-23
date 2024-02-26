import mysql from "mysql";
import config from "./config.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Set up MySQL connection pool
const pool = mysql.createPool(config);

app.get("/api/addUser", (req, res) => {
  let userID = req.query.uid;
  let email = req.query.email;
  let name = req.query.name;
  let sql = `INSERT INTO user_info (UID, email, name) VALUES (?, ?, ?)`;
  var values = [userID, email, name];
  pool.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error inserting user:", err);
    }
    let string = JSON.stringify(result);
    res.send({ express: string });
    console.log("User added to database");
  });
});

app.get("/api/loadUserInfo", (req, res) => {
  let userID = req.query.uid;
  let sql = `SELECT * FROM user_info WHERE UID = ?`;
  var values = [userID];
  pool.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error loading user:", err);
    }
    let string = JSON.stringify(result);
    res.send({ express: string });
    console.log("User loaded from database");
  });
});

app.get("/api/updateUserInfo", (req, res) => {
  let userID = req.query.uid;
  let email = req.query.email;
  let name = req.query.name;
  let age = req.query.age;
  let weight = req.query.weight;
  let goals = req.query.goals;
  let sql = `UPDATE user_info SET email = ?, name = ?, age = ?, weight = ?, goals = ? WHERE UID = ?`;
  var values = [email, name, age, weight, goals, userID];
  pool.query(sql, values, (err, result, fields) => {
    if (err) {
      console.error("Error updating user:", err);
    }
    let string = JSON.stringify(result);
    res.send({ express: string });
    console.log("User updated in database");
  });
});

// API to read meals from the database
app.get("/api/foodIngredients", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection: " + err.message);
      res.status(500).send("Internal server error");
      return;
    }
    connection.query(
      "SELECT * FROM c4desai.food_ingredients_and_allergens",
      (error, results, fields) => {
        connection.release(); // release connection
        if (error) {
          console.error("Error querying database: " + error.message);
          res.status(500).send("Error querying database");
          return;
        }
        res.json(results); // send JSON response with the results
      }
    );
  });
});
// Example endpoint using Express.js and MySQL
// Example endpoint using Express.js and MySQL
app.post("/api/rateMeal", (req, res) => {
  const { name, rating, created_at } = req.body; // Assuming you receive these values from the frontend

  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection: " + err.message);
      res.status(500).json({ error: "Error getting MySQL connection" });
      return;
    }

    const sql =
      "INSERT INTO ratings (name, rating, created_at) VALUES (?, ?, ?)";
    connection.query(
      sql,
      [name, rating, created_at],
      (error, results, fields) => {
        connection.release(); // release connection
        if (error) {
          console.error("Error inserting rating:", error);
          res.status(500).json({ error: "Error inserting rating" });
          return;
        }
        res.json({ message: "Rating submitted successfully" });
      }
    );
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
