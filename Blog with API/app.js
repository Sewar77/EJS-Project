import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/viewPost", (req, res) => {
  res.render("viewPost.ejs", { posts });
});

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

app.post("/createPost/:id", (req, res) => {
  const { title, content, nameAuthr } = req.body;
  if (!title || !content || !nameAuthr) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const post = {
    id: posts.length + 1,
    title,
    content,
    nameAuthr,
  };
  posts.push(post);
  res.redirect("/createPost");
});
app.put("/updatePost/:id", (req, res) => {
  const index = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === index);
  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }
  const { title, content, nameAuthr } = req.body;
  if (!title || !content || !nameAuthr) {
    return res.status(400).json({ error: "All fields are required" });
  }
  posts[postIndex] = { id: postIndex, title, content, nameAuthr };
  res.redirect("/viewPost");
});

app.delete("/deletePost/:id", (req, res) => {
  const index = parseInt(req.params.id);
  if (index < 0 || index >= posts.length) {
    return res.status(404).json({ error: "Post not found" });
  }
  posts.splice(index, 1);
  res.redirect("/viewPost");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
