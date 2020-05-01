const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/posts");

mongoose.Promise = global.Promise;
// DataBase
mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });

app.use(express.json());

// Routes

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/posts", postRoutes);

const port = process.env.PORT || 5000;

// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
