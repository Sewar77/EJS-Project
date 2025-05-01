import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

let messages = [];

app.get("/about", (req, res) => {
  res.render("about.ejs", {messages : messages});
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/contact", (req, res) => {
  const userMessage = {
    message: req.body["message"],
    name: req.body["name"],
  };
messages.push(userMessage);
res.redirect("/contact")
});

let posts = [];

app.get("/viewPost", (req, res) => {
  res.render("viewPost.ejs", { posts: posts });
});

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});
app.post("/createPost", (req, res) => {
  const newPost = {
    title: req.body["title"],
    content: req.body["content"],
  };
  posts.push(newPost);
  res.redirect("/viewPost");
});

app.listen(port, () => {});
