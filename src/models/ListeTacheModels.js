const postgres = require('../config/db');


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
            let requete = "UPDATE taches SET titre = $1, description = $2, date_debut = $3, date_echeance = $4 WHERE tache_id = $5";

            let params = [tache.titre, tache.description, tache.date_debut, tache.date_echeance, tache.tache_id];

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
            let requete = "UPDATE sous_taches SET titre = $1 WHERE sous_tache_id = $2";

            let params = [sousTache.titre, sousTache.sous_tache_id];

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