import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "newpassword2023",
  database: "visitor_management_system",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello This is the backend!");
});

app.get("/visitors", (req, res) => {
  const q = "SELECT * FROM visitor";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/addvisitor", (req, res) => {
  const q =
    "INSERT INTO visitor (`id`, `fullname`, `contactno`, `purpose`, `visited_with`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.fullname,
    req.body.contactno,
    req.body.purpose,
    req.body.visited_with,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);

    return res.json("Visitor has been added successfully!");
  });
});

app.post("/checkoutvisitor", (req, res) => {
  const q =
    "UPDATE visitor SET check_out_time = CURRENT_TIMESTAMP, status = 'checked_out' WHERE id = (?)";
  const values = [req.body.id];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);

    return res.json("Visitor has been updated successfully!");
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE username = ?", username, (error, results) => {
    if (error) {
      console.error("Error retrieving user from database:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user.id }, "my_secret_key", {
        expiresIn: "1h",
      });

      res.status(200).json({ token });
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
