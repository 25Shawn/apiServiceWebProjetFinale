const listeTache = require('../models/ListeTacheModels');


exports.afficherListeTacheIncomplete = (req, res) => {

    const cleApi = req.headers.authorization.split(' ')[1];

    listeTache.RequeteafficherListeTacheIncomplete(cleApi)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Liste de tâche non trouvée." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la liste de tâches." });
        });
};

exports.afficherListeTacheComplete = (req, res) => {

    const cleApi = req.headers.authorization.split(' ')[1];
    listeTache.RequeteafficherListeTacheComplete(cleApi)
        
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Liste de tâche non trouvée." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la liste de tâches." });
        });
}

exports.AfficherDetail = (req, res) => {
    const cleApi = req.headers.authorization.split(' ')[1];

    listeTache.RequeteAfficherDetail(req.params.id, cleApi)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Le détail d'une tâche n'est pas trouvé." });
            }
            
            return res.status(200).json(resultats);
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement du détail d'une tâche." });
        });
}

exports.AjouterTache = (req, res) => {
    const cleApi = req.headers.authorization.split(' ')[1];

    listeTache.RequeteAjouterTache(req.body, cleApi)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "L'ajout d'une tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "La tâche a été ajoutée avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une tâche." });
        });
}

exports.ModifierTache = (req, res) => {
    const cleApi = req.headers.authorization.split(' ')[1];

    listeTache.RequeteModifierTache(req.body, cleApi)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification de la tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "La tâche a été modifiée avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification d'une tâche." });
        });
}

exports.ModifierStatusTache = (req, res) => {
    const cleApi = req.headers.authorization.split(' ')[1];

    listeTache.RequeteModifierStatusTache(req.query, cleApi)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification du status de la tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "Le status de la tâche a été modifié avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification du status d'une tâche." });
        });
}

exports.SupprimerTache = (req, res) => {
    const cleApi = req.headers.authorization.split(' ')[1];

    listeTache.RequeteSupprimerTache(req.query, cleApi)
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La supression de la tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "La tâche a été supprimée avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la suppression d'une tâche." });

        });
}

exports.AjouterSousTache = (req, res) => {
    let tache_id = req.body.tache_id;


    listeTache.VerifierUtilisateurTache(tache_id)
        .then((utilisateurBool) => {


            if (!utilisateurBool) {
                return res.status(403).json({ message: "La tâche n'a pas d'utilisateur associé." });
            }

            let params = [tache_id, req.body.titre, req.body.complete];
            return listeTache.RequeteAjouterSousTache(params);
        })
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "L'ajout d'une sous-tâche n'a pas été trouvé." });
            }
            return res.status(200).json({ message: "La sous-tâche a été ajoutée avec succès." });
        })
        .catch((erreur) => {

            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de l'ajout d'une sous-tâche." });
        });
}

exports.ModifierSousTache = (req, res) => {

    let sous_tache_id = req.body.sous_tache_id;
    listeTache.RecupererTacheId(sous_tache_id)
        .then((tache_id) => {


            if (!tache_id) {

                return res.status(404).json({ message: "La sous-tâche spécifiée n'existe pas." });
            }

            return listeTache.VerifierUtilisateurTache(tache_id);
        })
        .then((utilisateurBool) => {

            if (!utilisateurBool) {

                return res.status(403).json({ message: "La tâche n'a pas d'utilisateur associé." });
            }

            let params = [req.body.titre, sous_tache_id];

            return listeTache.RequeteModifierSousTache(params);
        })
        .then((resultats) => {

            if (!resultats || resultats.length === 0) {

                return res.status(404).json({ message: "La modification d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "La sous tâche a été modifiée avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification d'une sous tâche." });
        });
}

exports.ModifierStatusSousTache = (req, res) => {

    let sous_tache_id = req.query.sous_tache_id;


    listeTache.RecupererTacheId(sous_tache_id)
        .then((tache_id) => {
            
            if (!tache_id) {
                return res.status(404).json({ message: "La sous-tâche spécifiée n'existe pas." });
            }

            return listeTache.VerifierUtilisateurTache(tache_id);
        })
        .then((utilisateurBool) => {
            if (!utilisateurBool) {
                return res.status(403).json({ message: "La tâche n'a pas d'utilisateur associé." });
            }

            let params = [req.query.complete, sous_tache_id];
            return listeTache.RequeteModifierStatusSousTache(params);
        })
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "La modification du status d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "Le status de la sous tâche a été modifié avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la modification du status d'une sous tâche." });
        });
}

exports.SupprimerSousTache = (req, res) => {

    let sous_tache_id = req.query.sous_tache_id;

    listeTache.RecupererTacheId(sous_tache_id)
        .then((tache_id) => {


            if (!tache_id) {

                return res.status(404).json({ message: "La sous-tâche spécifiée n'existe pas." });
            }

            return listeTache.VerifierUtilisateurTache(tache_id);
        })
        .then((utilisateurBool) => {
            if (!utilisateurBool) {
                return res.status(403).json({ message: "La tâche n'a pas d'utilisateur associé." });
            }

            let params = [sous_tache_id];
            return listeTache.RequeteSupprimerSousTache(params);
        })
        .then((resultats) => {
            if (!resultats || resultats.length === 0) {
                return res.status(404).json({ message: "Suppression d'une sous tâche n'est pas trouvé." });
            }
            return res.status(200).json({ message: "La sous tâche a été supprimée avec succès."});
        })
        .catch((erreur) => {
            if (erreur instanceof SyntaxError) {
                return res.status(400).json({ message: "La syntaxe de la requête est incorrecte." });
            }
            return res.status(500).json({ message: "Une erreur est survenue lors du traitement de la suppression d'une sous tâche." });
        });
}