import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "newpassword2023",
    database: "visitor_management_system"
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello This is the backend!");
})

app.get("/visitors", (req, res) => {
    const q = "SELECT * FROM visitor";
    db.query(q , (err, data) => {
        if(err) return res.json(err);

        return res.json(data);
    })
})

app.post("/addvisitor", (req, res) => {
    const q = "INSERT INTO visitor (`id`, `fullname`, `contactno`, `purpose`, `visited_with`) VALUES (?)";
    const values = [
        req.body.id,
        req.body.fullname,
        req.body.contactno,
        req.body.purpose,
        req.body.visited_with
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);

        return res.json("Visitor has been added successfully!");
    })
})

app.post("/checkoutvisitor", (req, res) => {
    const q = "UPDATE visitor SET check_out_time = CURRENT_TIMESTAMP, status = 'checked_out' WHERE id = (?)";
    const values = [
        req.body.id
    ];

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err);

        return res.json("Visitor has been updated successfully!");
    })
})

app.listen(8800, ()=> {
    console.log("Connected to Backend!");
})