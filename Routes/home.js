const express = require('express');
const router = express.Router();
const post = require('../Models/Post');

//router.get('/', (req, res, next)=>{
  //  res.send('Express router is working');
//});
router.get('/', (req, res, next)=>{
    res.render('home');
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


module.exports= router;