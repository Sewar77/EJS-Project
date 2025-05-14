import express from "express";
import methodOverride from "method-override";

import postRouter from "./routes/posts.js";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/newPost", (req, res) => {
  res.render("newPost.ejs");
});

app.get("/viewPost", (req, res) => {
  res.render("viewPosts.ejs");
});



app.get("/editPost", (req, res) => {
  res.render("editPost.ejs");
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
