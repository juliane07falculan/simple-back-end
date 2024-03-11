const Blog = require("../models/blog");

const blogIndex = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blogCreateGet = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};

const blogCreatePost = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {});
};

const blogDetails = (req, res) => {
  const blogId = req.params.id;
  Blog.findById(blogId)
    .then((result) => {
      res.render("blogs/details", { title: "Blog Details", blog: result });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Page Not Found" });
    });
};

const blogDelete = (req, res) => {
  const blogId = req.params.id;
  Blog.findByIdAndDelete(blogId)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blogIndex,
  blogCreateGet,
  blogCreatePost,
  blogDetails,
  blogDelete,
};
