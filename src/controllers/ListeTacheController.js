const e = require('express');
const usager = require('../models/ListeTacheModels');

exports.afficherListeTacheIncomplete = (req, res) => {
    usager.RequeteafficherListeTacheIncomplete()
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

    usager.RequeteafficherListeTacheComplete(complete)
        
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
    usager.RequeteAfficherDetail(req.params.id)
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
    usager.RequeteAjouterTache(req.body)
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
    usager.RequeteModifierTache(req.body)
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
    usager.RequeteModifierStatusTache(req.query)
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
    usager.RequeteSupprimerTache(req.query)
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
    usager.RequeteAjouterSousTache(req.body)
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
    usager.RequeteModifierSousTache(req.body)
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
    usager.RequeteModifierStatusSousTache(req.query)
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
    usager.RequeteSupprimerSousTache(req.query)
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
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une clé d'api." });
        });
}