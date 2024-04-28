const { compare } = require('bcrypt');
const postgres = require('../config/db');
const utilisateur = require('./utilisateurModels');


class ListeTachesUsager{

    static async RequeteafficherListeTacheIncomplete(cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {

            let requete = "SELECT tache_id, titre, description, date_debut,date_echeance,complete,utilisateur_id FROM taches where complete = false AND utilisateur_id = $1";
            postgres.query(requete, [utilisateur_id], (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    console.log(resultats.rows);
                    resolve(resultats.rows);
                }
            });
        });
    }

    static async RequeteafficherListeTacheComplete(cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {

            let requete = "SELECT tache_id, titre, description, date_debut,date_echeance,complete,utilisateur_id FROM taches WHERE utilisateur_id = $1 AND complete = true";
            postgres.query(requete,[utilisateur_id], (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats.rows);
                }
            });
        });
    }

    static async RequeteAfficherDetail(id, cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {
            let requete = "SELECT t.tache_id, t.utilisateur_id,t.titre AS tache_titre, t.description AS tache_description, t.date_debut, t.date_echeance,st.sous_tache_id AS sous_tache_id, st.titre AS sous_tache_titre, st.complete AS sous_tache_complete FROM taches t JOIN sous_taches st ON t.tache_id = st.tache_id WHERE t.tache_id = $1 AND t.utilisateur_id = $2";
            postgres.query(requete, [id,utilisateur_id], (erreur, resultats) => {
                if (erreur) {
                    console.error(erreur);
                    reject(erreur);
                } else {
                    console.log(resultats.rows);
                    resolve(resultats.rows);
                }
            });
        }).catch((erreur) => {
            
            console.error("Erreur lors de l'exécution de la requête SQL:", erreur);
            throw new Error("Une erreur est survenue lors de la récupération des détails de la tâche.");
        });
    }

    static async RequeteAjouterTache(tache, cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {
            let requete = "INSERT INTO taches (titre, description, date_debut, date_echeance, complete, utilisateur_id) VALUES ($1, $2, $3, $4, $5, $6)";

            let params = [tache.titre, tache.description, tache.date_debut, tache.date_echeance, tache.complete, utilisateur_id];

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

    static async RequeteModifierTache(tache,cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {
            let requete = "UPDATE taches SET titre = $1, description = $2, date_debut = $3, date_echeance = $4 WHERE tache_id = $5 AND utilisateur_id = $6";

            let params = [tache.titre, tache.description, tache.date_debut, tache.date_echeance, tache.tache_id, utilisateur_id];

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

    static async RequeteModifierStatusTache(tache,cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {
            let requete = "UPDATE taches SET complete = $1 WHERE tache_id = $2 AND utilisateur_id = $3";

            let params = [tache.complete, tache.tache_id, utilisateur_id];

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

    static async RequeteSupprimerTache(tache,cleApi) {

        const utilisateur_id = await ListeTachesUsager.ObtenirIdentifiantUsager(cleApi);

        return new Promise((resolve, reject) => {
            let requete = "DELETE FROM taches WHERE tache_id = $1 AND utilisateur_id = $2";

            let params = [tache.tache_id, utilisateur_id];

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

            postgres.query(requete, sousTache, (erreur, resultats) => {
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
            console.log(sousTache);
            postgres.query(requete, sousTache, (erreur, resultats) => {
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


            postgres.query(requete, sousTache, (erreur, resultats) => {
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


            postgres.query(requete, sousTache, (erreur, resultats) => {
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
    
    static ObtenirIdentifiantUsager(cleApi) {
        return new Promise((resolve, reject) => {
            let requete = "SELECT utilisateur_id FROM utilisateur WHERE cle_api = $1";
            let params = [cleApi];
            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    resolve(resultats.rows[0].utilisateur_id);
                }
            });
        });
    }

    static VerifierUtilisateurTache(tache_id) {
        return new Promise((resolve, reject) => {
            let requete = "SELECT COUNT(*) AS count FROM taches WHERE tache_id = $1 AND utilisateur_id IS NOT NULL";
            let params = [tache_id];
    
            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.log(erreur);
                    reject(erreur);
                } else {
                    const count = resultats.rows[0].count;
                    resolve(count > 0);
                }
            });
        });
    }

    static RecupererTacheId = (sous_tache_id) => {
        return new Promise((resolve, reject) => {
            let requete = "SELECT tache_id FROM sous_taches WHERE sous_tache_id = $1";
            let params = [sous_tache_id];
    
            postgres.query(requete, params, (erreur, resultats) => {
                if (erreur) {
                    console.error("Erreur lors de la récupération de la tâche ID :", erreur);
                    reject(erreur);
                } else {
                    if (resultats.rows.length === 0) {
                        resolve(null);
                    } else {
                        
                        resolve(resultats.rows[0].tache_id);
                    }
                }
            });
        });
    }

}

module.exports = ListeTachesUsager;