const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

mongoose.connect("mongodb://mongodb:27017/express-mongo-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Pelicula = mongoose.model("Pelicula", {
  name: String,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, this is your Express app with MongoDB!");
});

app.get("/list", async (req, res) => {
  try {
    const lista = await Pelicula.find();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
