import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static("public"));

let posts = [];

router.get("/viewPosts", (req, res) => {
  res.render("viewPosts.ejs", { posts: posts });
});

router.post("/newPost", (req, res) => {
  const { title, content, nameAuthar } = req.body;

  if (!title || !content || !nameAuthar) {
    return res.status(400).send("Please fill in all fields");
  }
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    nameAuthar: req.body.nameAuthar,
  };
  posts.push(newPost);
  res.redirect("/posts/viewPosts");
});

router.get("/editPost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    res.render("editPost.ejs", { post: post });
  } else {
    res.status(404).json("no posts there");
  }
});

router.put("/editPost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    (post.title = req.body.title),
      (post.content = req.body.content),
      (post.nameAuthar = req.body.nameAuthar);
    res.redirect("/posts/viewPosts");
  } else {
    res.status(404).json("no posts there");
  }
});

router.delete("/deletePost/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  if (isNaN(postId)) {
    return res.status(400).send("Invalid post ID");
  }
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) {
    return res.status(404).send("Post not found");
  }
  posts.splice(index, 1);
  res.redirect("/posts/viewPosts");
});

export default router;
