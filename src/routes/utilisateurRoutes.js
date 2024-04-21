const express = require('express');
const router = express.Router();    
const usager = require('../controllers/utilisateurController');

// ajouter un utilisateur
router.post('/ajouterUtilisateur', (req,res) => {
    usager.AjouterUtilisateur(req, res);
});

// ajouter une clé API
router.put('/demandeCleApi', (req,res) => {
    usager.AjouterCleApi(req, res);
});


module.exports = router;