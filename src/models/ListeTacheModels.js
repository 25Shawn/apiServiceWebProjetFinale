const postgres = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const costFactor = 10;

class ListeTachesUsager{


    static RequeteafficherListeTacheIncomplete() {
        return new Promise((resolve, reject) => {

            let requete = "SELECT tache_id, titre, description, date_debut,date_echeance,complete FROM taches where complete = false";
            postgres.query(requete, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats.rows);
                }
            });
        });
    }

    static RequeteafficherListeTacheComplete() {
        return new Promise((resolve, reject) => {

            let requete = "SELECT tache_id, titre, description, date_debut,date_echeance,complete FROM taches";
            postgres.query(requete, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats.rows);
                }
            });
        });
    }

    static RequeteAfficherDetail(id) {
        return new Promise((resolve, reject) => {
            let requete = "SELECT t.titre AS tache_titre, t.description AS tache_description, t.date_debut, t.date_echeance, st.titre AS sous_tache_titre, st.complete AS sous_tache_complete FROM taches t JOIN sous_taches st ON t.tache_id = st.tache_id WHERE t.tache_id = $1";
            postgres.query(requete, [id], (erreur, resultats) => {
                if (erreur) {
                    console.error(erreur); // Log l'erreur dans la console
                    reject(erreur); // Rejette la promesse avec l'erreur
                } else {
                    console.log(resultats.rows);
                    resolve(resultats.rows); // Résout la promesse avec les résultats
                }
            });
        }).catch((erreur) => {
            // Capture l'erreur ici et renvoie une réponse avec statut 500
            console.error("Erreur lors de l'exécution de la requête SQL:", erreur);
            throw new Error("Une erreur est survenue lors de la récupération des détails de la tâche.");
        });
    }

    static RequeteAjouterTache(tache) {
        return new Promise((resolve, reject) => {
            let requete = "INSERT INTO taches (titre, description, date_debut, date_echeance, complete) VALUES ($1, $2, $3, $4, $5)";

            let params = [tache.titre, tache.description, tache.date_debut, tache.date_echeance, tache.complete];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteModifierTache(tache) {
        return new Promise((resolve, reject) => {
            let requete = "UPDATE taches SET titre = $1, description = $2, date_debut = $3, date_echeance = $4, complete = $5 WHERE tache_id = $6";

            let params = [tache.titre, tache.description, tache.date_debut, tache.date_echeance, tache.complete, tache.tache_id];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteModifierStatusTache(tache) {
        return new Promise((resolve, reject) => {
            let requete = "UPDATE taches SET complete = $1 WHERE tache_id = $2";

            let params = [tache.complete, tache.tache_id];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteSupprimerTache(tache) {
        return new Promise((resolve, reject) => {
            let requete = "DELETE FROM taches WHERE tache_id = $1";

            let params = [tache.tache_id];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteAjouterSousTache(sousTache) {
        return new Promise((resolve, reject) => {
            let requete = "INSERT INTO sous_taches (tache_id, titre, complete) VALUES ($1, $2, $3)";

            let params = [sousTache.tache_id, sousTache.titre, sousTache.complete];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteModifierSousTache(sousTache) {
        return new Promise((resolve, reject) => {
            let requete = "UPDATE sous_taches SET titre = $1, complete = $2 WHERE sous_tache_id = $3";

            let params = [sousTache.titre, sousTache.complete, sousTache.sous_tache_id];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteModifierStatusSousTache(sousTache) {
        return new Promise((resolve, reject) => {
            let requete = "UPDATE sous_taches SET complete = $1 WHERE sous_tache_id = $2";

            let params = [sousTache.complete, sousTache.sous_tache_id];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteSupprimerSousTache(sousTache) {
        return new Promise((resolve, reject) => {
            let requete = "DELETE FROM sous_taches WHERE sous_tache_id = $1";

            let params = [sousTache.sous_tache_id];

            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats);
                }
            });
        });
    }

    static RequeteAjouterUtilisateur(utilisateur) {
        return new Promise((resolve, reject) => {
            
            bcrypt.genSalt(costFactor, (erreur, sel) => {

                if (erreur) {
                    reject(erreur);

                } else {
                    
                    bcrypt.hash(utilisateur.mot_de_passe, sel, (erreur, hash) => {
                        if (erreur) {
                            reject(erreur);

                        } else {
                            
                            let uuid = uuidv4();
                            let requete = "INSERT INTO utilisateur (nom, prenom, courriel, cle_api, password) VALUES ($1, $2, $3, $4, $5)";
                            let params = [utilisateur.nom, utilisateur.prenom, utilisateur.courriel, uuid, hash];
    
                            postgres.query(requete, params, (erreur, resultats) => {
                                if (erreur) {
                                    console.log(erreur);
                                    reject(erreur);
                                } else {
                                    let reponse = { nom: utilisateur.nom, prenom: utilisateur.prenom, courriel: utilisateur.courriel, cle_api: uuid };
                                    resolve(reponse);
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    static RequeteAjouterCleApi(utilisateur) {
        return new Promise((resolve, reject) => {
            let uuid = uuidv4();
    
  
            let requeteSelect = "SELECT password FROM utilisateur WHERE courriel = $1";
            let paramsSelect = [utilisateur.courriel];
    
            postgres.query(requeteSelect, paramsSelect, (Error, Results) => {
                if (Error) {
                    reject(Error);
                    return;
                }
    
                if (Results.rows.length === 0) {

                    reject(new Error("Utilisateur non trouvé"));
                    return;
                }
    

                bcrypt.compare(utilisateur.mot_de_passe, Results.rows[0].password, (Error, match) => {
                    if (Error) {

                        reject(Error);
                        return;
                    }
    
                    if (!match) {
                        
                        reject(new Error("Mot de passe incorrect"));
                        return;
                    }

                    let requete = "UPDATE utilisateur SET cle_api = $1 WHERE courriel = $2";
                    let params = [uuid, utilisateur.courriel];
    
                    postgres.query(requete, params, (updateError, updateResults) => {
                        if (updateError) {
            
                            reject(updateError); 
                            return;
                        }
                        let reponseCleApi = { courriel: utilisateur.courriel, cle_api: uuid };
                        resolve(reponseCleApi);
                    });
                });
            });
        });
    }

    static verifierCle(cleApi) {
        return new Promise((resolve, reject) => {
            let requete = "SELECT * FROM utilisateur WHERE cle_api = $1";
            let params = [cleApi];
            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    if (resultats.rows.length === 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            });
        });
    }
    


}

module.exports = ListeTachesUsager;