const express = require('express');
const router = express.Router();
const post = require('../Models/Post');

//router.get('/', (req, res, next)=>{
  //  res.send('Express router is working');
//});
router.get('/', (req, res, next) => {
  post.find().then(docs => {
    res.render('home', { posts: docs });
  }).catch(err => {
    console.log("something wrong with MongoDB: can't retrieve data");
    // Handle the error appropriately. You might want to send a response with an error code.
    res.status(500).send("Error retrieving data from the database");
  });
});


router.post('/add', async (req, res, next) => {
  const { Title, Content } = req.body;
  
  console.log(JSON.stringify(req.body));

  const uclPost = new post({
    Title,
    Content
  });

  try {
    // Tenter de sauvegarder le post dans la base de données
    await uclPost.save();
    console.log("Data is recorded successfully");
    // Rediriger le client vers la page d'accueil après un enregistrement réussi
    res.redirect('/');
  } catch (err) {
    // En cas d'erreur, loguer l'erreur et renvoyer une réponse d'erreur
    console.error("Something went wrong to save data to database", err);
    res.status(500).send("Something went wrong to save data to database");
  }
});

// Route to show update element
router.get('/edit/:id', async (req, res, next) => {
  try {
    const doc = await post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Options: returns the modified document rather than the original by default
    );
    
    if (!doc) {
      console.log("Can't retrieve data and edit because the document was not found.");
      res.status(404).send("Document not found");
    } else {
      res.render('edit', { post: doc });
    }
  } catch (err) {
    console.log("Can't retrieve data and edit because of some database problem");
    res.status(500).send("Error connecting to the database");
  }
});


// Route to update element
router.post('/edit/:id', async (req, res, next) => {
  try {
    const updatedPost = await post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // This option will return the document after update
    );
    // If no document found, updatedPost will be null
    if (!updatedPost) {
      console.log("No document found with that ID");
      // Handle the not found situation, for example, by sending a 404 response
      res.status(404).send("No document found with that ID");
    } else {
      res.redirect('/');
    }
  } catch (err) {
    console.log("something went wrong to update your data");
    // Pass the error to the error-handling middleware
    next(err);
  }
});


// Route to delete Item
router.get('/delete/:id', async (req, res, next) => {
  try {
    const result = await post.findByIdAndDelete(req.params.id);
    if (result) {
      console.log("Deleted successfully");
      // Redirect or send a response here after successful deletion
      res.redirect('/'); // for example, redirect to the home page
    } else {
      console.log("No document found with that ID");
      // Handle the case where no document was found
      res.status(404).send("Not Found");
    }
  } catch (err) {
    console.log("Something went wrong to delete data");
    next(err); // Pass errors to Express error handling middleware
  }
});



module.exports= router;