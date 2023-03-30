// webiste controleer and config
const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
const userRoutes = require("./routes/allarticle");
const helmet = require("helmet");



// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// autorefresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose link to database mongoDB
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://ziiaksel:Lwalida1993@cluster0.ogjuslq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  // checking connection or promise
  // if connection successed
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  // else if databse failed to connect console error
  .catch((error) => {
    console.error("Could not connect to MongoDB...", error);
  });

// helmet secure expressjs
 app.use(helmet());
// routes
// redirect to index.ejs
app.get("/", (req, res) => {
  // mytitle is object responsable for auto-change the title
  res.redirect("index");
});
// send to page index.ejs

app.get("/new-article", (req, res) => {
  // mytitle is object responsable for auto-change the title
  res.render("new-article", { mytitle: "create new article" });
});

// -------------------------------------------------
// index PATH route where all articles are displayed-
app.use("/index", userRoutes);
// ------------------------------closed---------------------

//404 not found handler---------ERROR-----------------
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// del
// app.get('/index', (req, res) => {
//   // mytitle is object responsable for auto-change the title
//   res.render('index',{mytitle:"home page",})
// })
