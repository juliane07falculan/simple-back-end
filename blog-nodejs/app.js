const express = require("express");
const mongoose = require("mongoose");
//create logger middleware
const morgan = require("morgan");
//import express router
const blogRoutes = require("./routes/blogRoutes");
//express app
const app = express();
//connect to database
const dbURI =
  "mongodb+srv://username:password@nodejspractice.ahlndpm.mongodb.net/nodejs-practice?retryWrites=true&w=majority&appName=nodejspractice";
mongoose
  .connect(dbURI)
  .then((result) => {
    //listen for requests
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
//view engine
app.set("view engine", "ejs");
//morgan - logger middleware
app.use(morgan("dev"));
//middleware & static file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//route parameters
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
