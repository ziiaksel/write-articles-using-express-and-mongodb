const express = require('express');
const router = express.Router();
const allArticlesControler = require('../controllers/articleController')





// ---------------Create a new article ---------------------
// Set up route to handle form submissions
   router.post("/",allArticlesControler.create_article_post);
    
    // ------------------------------closer---------------
    
    
    // ---------------------FETCH DATA INSIDE WEBSITE-------------------
      // fetching data into website from db using methode: find()
      // and data we got into : "result" -is : ARRAY OF OBJECTS INside MONGODB
    //  make promise the i get the data
    router.get("/",allArticlesControler.fetch_all_articles_get)
    // -------------------------close----------------------------------
    
    // ARTICLE DETAILS 
    router.get("/:id",allArticlesControler.fetch_article_details_get)
    // -------------------------close----------------------------------
    

    //DELETE ARTICLE  
    router.delete("/:id",allArticlesControler.delete_article_delete)
    // -------------------------close----------------------------------


    // export moduls
module.exports = router;