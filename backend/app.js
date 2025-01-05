const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/mydb", { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({ secret: "mysecret" }));

const routes = require("./routes/index");
app.use("/api", routes);
app.use((req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
