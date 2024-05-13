const express = require('express');
const router = express.Router();    
const listeTache = require('../controllers/ListeTacheController');
const authentification = require('../middlewares/authentification');
const {logger} = require('../middlewares/ErreurLogs');

// Pour toutes les erreurs
router.use(logger);

// affiche la liste des tâches incomplètes
router.get('/afficherListeTache',authentification, (req, res) => {

    listeTache.RequeteafficherListeTacheIncomplete(req, res);
});

// affiche la liste des tâches complètes
router.get('/afficherListeTache/complete',authentification, (req, res) => {
    listeTache.afficherListeTacheComplete(req, res);
});

// affiche le detail d'une tâche
router.get('/afficherDetail/:id',authentification, (req, res) => {
    listeTache.AfficherDetail(req, res);
});

// ajoute une tâche
router.post('/ajouterTache',authentification, (req,res) => {
    listeTache.AjouterTache(req, res);
});

// modifier une tâche
router.put('/modifierTache',authentification, (req,res) => {
    listeTache.ModifierTache(req, res);
});

// modifier le statut d'une tâche
router.put('/modifierSatutTache',authentification, (req,res) => {
    listeTache.ModifierStatusTache(req, res);
});

// supprimer une tâche
router.delete('/supprimerTache',authentification, (req,res) => {
    listeTache.SupprimerTache(req, res);
});

// ajouter une sous-tâche
router.post('/ajouterSousTache',authentification, (req,res) => {
    listeTache.AjouterSousTache(req, res);
});

// modifier une sous-tâche
router.put('/modifierSousTache',authentification, (req,res) => {
    listeTache.ModifierSousTache(req, res);
});

// modifier le statut d'une sous-tâche
router.put('/modifierSatutSousTache',authentification, (req,res) => {
    listeTache.ModifierStatusSousTache(req, res);
});

// supprimer une sous-tâche
router.delete('/supprimerSousTache', authentification, (req,res) => {
    listeTache.SupprimerSousTache(req, res);
});




module.exports = router;
