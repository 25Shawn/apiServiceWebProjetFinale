const usager = require('../models/utilisateurModels');

exports.AjouterUtilisateur = (req, res) => {
    usager.RequeteAjouterUtilisateur(req.body)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "L'ajout d'un utilisateur n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {

            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'un utilisateur." });
        });
}

exports.AjouterCleApi = (req, res) => {
    usager.RequeteAjouterCleApi(req.body)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La demande d'une clé d'api n'est pas trouvable." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            console.log(erreur);
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une clé d'api." });
        });
}