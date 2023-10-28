require("dotenv").config();
let PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();

app.use(express.json());
app.listen(PORT, () =>
  console.log(`listineing on http://localhost:${PORT}/students`)
);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));

const students_route = require("./routes/students_route");
app.use("/students", students_route);
