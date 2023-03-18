
// webiste controler
const express = require('express')
const app = express()
const port = 3000
app.set('view engine','ejs')
app.use(express.static('public'))

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// include file schema
// requiere function "Article" from that file 
const Article = require('./models/modelShema')



// autorefresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 


// mongoose link to database mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ziiaksel:Lwalida1993@cluster0.ogjuslq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// checking connection or promise
// if connection successed
.then ((result) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
// else if databse failed to connect console error
.catch( (error) => {
  console.error('Could not connect to MongoDB...', error)
})

// redirect to index.ejs
app.get('/', (req, res) => {
  res.redirect('/index')
})
// send to page index.ejs
app.get('/index', (req, res) => {
  // mytitle is object responsable for auto-change the title
  res.render('index',{mytitle:"home page"})
})
app.get('/new-article',async (req, res) => {
  res.render('new-article',{mytitle:"create new articel"})

  // fetching data into website from db using methode: find()
  // and date we got into : "result" -is : ARRAY OF OBJECTS INside MONGODB
//  make promise
  await Article.find({})
  //if promise success
  .then((result) => {   })
// if promise not succed
  .catch((err) => {err})
  
})


// Route handler for POST requests to '/submit-form'
// app.post('/index', (req, res) => {

// Create a new article ---------------------
// Set up route to handle form submissions
app.post('/index', (req, res) => {
//   // Create new article with data from form
  const newArticle = new Article({
    fullname: req.body.fullname,
    number: req.body.number,
    country: req.body.country,
    email: req.body.email,
    title: req.body.title,
    subject: req.body.subject,
  });

  // Save new article to database
  newArticle.save()
    .then(() =>  res.redirect('/index'))
    .catch(err => res.status(400).send(err));
});



//404 not found function
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

