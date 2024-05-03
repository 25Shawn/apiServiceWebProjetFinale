const postgres = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const costFactor = 10;

class utilisateur {


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

    static VerifierCourrielUnique(courriel) {
        return new Promise((resolve, reject) => {
            let requete = "SELECT COUNT(*) FROM utilisateur WHERE courriel = $1";

            postgres.query(requete, [courriel], (erreur, resultat) => {
                if (erreur) {
                    reject(erreur);
                } else {
                    const count = (resultat.rows[0].count);
                    resolve(count === 0);
                }
            });
        });
    }
}

module.exports = utilisateur;
