import {initSocket} from "./socket.js";
import {newSubWindow} from "../displayer/new-sub-window.js";

// Initiation de la fenêtre secondaire
window.wdw = newSubWindow();

// Initiation du socket

/*export async function initMainSocket() {
    for (let i = 0; i < 5; i++) {
        try {
            initSocket();
            break;
        }
        catch (e) {
            console.error(e);
            console.error("Erreur de connexion au serveur");
            console.log(`Tentative ${i}, reconnexion dans 2 secondes`)
        }
        
        if (i === 4) console.error("Erreur de connexion au serveur");
        
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

initMainSocket();*/

document.querySelector(".loader-layout").classList.remove("active");
document.querySelector(".loader-subject").textContent="Initialisation de l'appairage, veuillez patienter..";

initSocket();

// Requête de récupération des données



// Traitement des données reçues

//requestParser(socket.dataSocket);