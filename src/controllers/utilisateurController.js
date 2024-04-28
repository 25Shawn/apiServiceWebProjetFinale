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
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'un utilisateur." });
        });
}

exports.AjouterCleApi = (req, res) => {
    
    if (!req.body || !req.body.courriel || !req.body.mot_de_passe) {
        return res.status(400).json({ message: "Les données d'entrée sont incomplètes ou incorrectes." });
    }

    
    usager.RequeteAjouterCleApi(req.body)
        .then((resultats) => {
            
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La demande d'une clé API n'est pas trouvable." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            } else {
                return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une clé API." });
            }
        });
};