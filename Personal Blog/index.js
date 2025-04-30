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

app.get("/message", (req, res) => {
  let message = req.body["Message"];
  let name = req.body["name"];
  
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/post", (req, res) => {
  res.render("post.ejs");
});

app.listen(port, () => {});
