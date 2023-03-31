// include file schema
// requiere modelshcema "Article" from that file 
const Article = require('../models/modelShema')

// ---------------------------------------------------------

// create new article and save it function 
const create_article_post = (req, res) => {
        //   // Create new article with data from form
          const newArticle = new Article({
            fullname: req.body.fullname,
            number: req.body.number,
            country: req.body.country,
            email: req.body.email,
            title: req.body.title,
            subject: req.body.subject,
          });
        // ------------------------closer------------------------
        
        // ---------------------------SAVE DATA IN DATABSE--------------
          // Save new article to database
          newArticle.save()
            .then(() =>  res.redirect('/index'))
            .catch(err => res.status(400).send(err));
        }

  // ------FETCH DATA INSIDE WEBSITE func----
      // fetching data into website from db using methode: find()
      // and data we got into : "result" -is : ARRAY OF OBJECTS INside MONGODB
    //  make promise the i get the data
    const fetch_all_articles_get = async (req, res) => {
      try {
          const result = await Article.find({});
          res.render('index', {mytitle:"all articles", arrArticle: result});
      } catch (err) {
          console.log(err);
      }
  };


// ARTICLE DETAILS func--------------------
const fetch_article_details_get = async (req, res) => {
  try {
      const Id = req.params.id;
      const result = await Article.findById(Id);
      res.render('details', {mytitle:"article details", objArticle: result});
  } catch (err) {
      console.log(err);
  }
};


// delete article func
const delete_article_delete = async (req, res) => {
  try{
    const Id  = req.params.id;
    await Article.findByIdAndDelete(Id);
    res.json({ myindex : "/index"});

  }catch(err){
    console.log(err);
  }
  
}



// export functions
module.exports={
  create_article_post,
fetch_all_articles_get,
fetch_article_details_get,
delete_article_delete,

}

// ----------------------------------------------------------