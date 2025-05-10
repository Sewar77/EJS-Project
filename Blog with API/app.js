import express from 'express';
import bodyParser from 'body-parser';
import e from 'express';

const port = 3000;
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render("home.ejs");
});

app.get('/about', (req, res) => {
  res.render("about.ejs");
});


app.get('/contact', (req, res) => { 
    res.render("contact.ejs");
    });

app.get('/createPost', (req, res) => {
    res.render("createPost.ejs");
}   );
app.post('/createPost', (req, res) => {
    const post = req.body;
    console.log(post);
    res.redirect('/');
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});