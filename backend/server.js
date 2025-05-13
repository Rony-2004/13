const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const conn = require("./db/conn");
const todoRoutes = require("./routes/todo");

const app = express();
conn();
app.use(express.json());
app.use("/api/todo", todoRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
