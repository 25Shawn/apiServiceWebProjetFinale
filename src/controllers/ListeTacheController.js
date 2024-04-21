const listeTache = require('../models/ListeTacheModels');

exports.afficherListeTacheIncomplete = (req, res) => {
    listeTache.RequeteafficherListeTacheIncomplete()
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Liste de tâche non trouvée." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la liste de tâches." });
        });
};

exports.afficherListeTacheComplete = (req, res) => {

    listeTache.RequeteafficherListeTacheComplete()
        
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Liste de tâche non trouvée." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la liste de tâches." });
        });
}

exports.AfficherDetail = (req, res) => {
    listeTache.RequeteAfficherDetail(req.params.id)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Le détail d'une tâche n'est pas trouvé." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            console.log("Statut de la réponse en cas d'erreur:", res.statusCode);
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement du détail d'une tâche." });
        });
}


exports.AjouterTache = (req, res) => {
    listeTache.RequeteAjouterTache(req.body)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "L'ajout d'une tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une tâche." });
        });
}

exports.ModifierTache = (req, res) => {
    listeTache.RequeteModifierTache(req.body)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification de la tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {

            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification d'une tâche." });
        });
}

exports.ModifierStatusTache = (req, res) => {
    listeTache.RequeteModifierStatusTache(req.query)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification du status de la tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification du status d'une tâche." });
        });
}

exports.SupprimerTache = (req, res) => {
    listeTache.RequeteSupprimerTache(req.query)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La supression de la tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la suppression d'une tâche." });

        });
}

exports.AjouterSousTache = (req, res) => {
    listeTache.RequeteAjouterSousTache(req.body)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "L'ajout d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une sous tâche." });
        });
}

exports.ModifierSousTache = (req, res) => {
    listeTache.RequeteModifierSousTache(req.body)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification d'une sous tâche." });
        });
}

exports.ModifierStatusSousTache = (req, res) => {
    listeTache.RequeteModifierStatusSousTache(req.query)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification du status d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification du status d'une sous tâche." });
        });
}

exports.SupprimerSousTache = (req, res) => {
    listeTache.RequeteSupprimerSousTache(req.query)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Suppression d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la suppression d'une sous tâche." });
        });
}

