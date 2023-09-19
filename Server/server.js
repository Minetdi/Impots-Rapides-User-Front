// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const api = require("./routes/api");

const app = express();

const db =
  "mongodb+srv://turffgroup:N9Jh9OBVz3xp5ytL@ir-db.te1zfe6.mongodb.net/ir-db?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Connect to MongoDB
// mongoose.connect(db, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose
  .connect(db, connectionParams)
  .then(() => {
    console.log(`Connected to MongoDB and server is running on port ${PORT}`);
  })
  .catch((err) => {
    console.error("Erreur : " + err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/", api);

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("hello IR");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
