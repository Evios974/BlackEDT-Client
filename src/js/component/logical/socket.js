import * as parser from "./parser.js";
import {ongletSelector} from '../displayer/domMetthods/onglet.js';

const debug = true;
var retries = 0;

export async function initSocket() {
    let buffer = await parser.configParser();

    // Création de la connexion websocket
    // Faire en sorte que la variable socket soit global
    window.socket = new WebSocket(
        // Adresse du serveur
        buffer.socket.address
    );

    // Définition des évènements
    // Lorsque la connexion est établie
    socket.onopen = () => {
        retries = 0;

        document.querySelector(".loader-layout").classList.remove("ty2");
        document.querySelector(".loader-subject").textContent="Chargement de l'affichage, veuillez patienter..";

        // Affichage de l'erreur dans la console
        if(debug) console.log("{initSocket, success} Socket connection established");

        // Lorsque l'on reçoit un message
        socket.onmessage = (e) => {
            if(debug){
                console.log("{initSocket, success} Socket message received : \n");
                console.log(e.data);
            }

            // Conversion des données JSON en objet
            parser.requestParser(e.data);
        };
    };

    // Lorsque la connexion est fermée
    socket.onclose = (e) => {
        document.querySelector(".loader-layout").classList.remove("active");
        document.querySelector(".loader-layout").classList.add("ty2");

        wdw.document.querySelector(".loader-layout").classList.add("active");
        ongletSelector(0);


        // Affichage de l'erreur dans la console
        if(debug) console.warn("{initSocket, event} Socket connection closed : " + JSON.stringify(e));

        if (retries < 2) { // Faire 3 tentatives au total
            retries++;
            document.querySelector(".loader-subject").textContent="Tentative de reconnexion dans 10 secondes...";
            if(retries > 0) document.querySelector(".loader-subject").textContent+=` (Essai n°${retries})`;
            console.log("Tentative de reconnexion dans 10 secondes...");
            setTimeout(initSocket, 10000); // Nouvelle tentative après 10 secondes
        } else {
            document.querySelector(".loader-subject").textContent="Échec de la reconnexion après 3 tentatives.";
            console.log("Échec de la reconnexion après 3 tentatives.");
            document.querySelector(".loader-btn").classList.remove("active");
            document.querySelector(".loader-btn").addEventListener('click', () =>{
                initSocket();
                document.querySelector(".loader-btn").classList.add("active");
            });
        }
    };
}