import {newButton} from '../divTemplate.js';
import {ongletSelector} from '../../displayer/domMetthods/onglet.js';

const debug = false;
let objectCache = null;
window.path = [];

export function initDisplay(object){
    // Sauvegarde de l'objet
    objectCache = object;

    // Initialisation des variables
    path = [];
    ongletSelector(0);

    // Affichage de l'arborescence
    refreshDisplay(object);
}

function refreshDisplay(object){
    const parent = document.querySelector(".treeBtnCtn");

    if(debug){
        console.log("{refreshDisplay, log} init Path : ");
        console.log(path);
        console.log("{refreshDisplay, log} init Object : ");
        console.log(object);
        console.log("{refreshDisplay, log} init ObjectCache : ");
        console.log(objectCache);
    }

    // Nettoyage de l'affichage
    parent.innerHTML = "";

    // Affichage du bouton de retour si l'on est pas à la racine
    if (path.length > 0){
        // Affichage du bouton de retour
        parent.insertAdjacentHTML("beforeend", newButton(1));

        const btnUp = document.querySelector(".treeBtnUp");

        // Ajout de l'évènement au bouton de retour
        btnUp.addEventListener("click", () => {
            // Suppression du dernier index de l'array path
            path.pop();

            if(debug) {
                console.log("{refreshDisplay, log} up Path : ");
                console.log(path);
                console.log("{refreshDisplay, log} up Object : ");
                console.log(object);
                console.log("{refreshDisplay, log} up ObjectCache : ");
                console.log(objectCache);
            }

            let objectBuffer = objectCache;

            // Récupération de l'objet à afficher en fonction de l'array path
            for (let i = 0; i < path.length; i++) {
                objectBuffer = objectBuffer[path[i]].content;
            }

            ongletSelector(0);

            // Affichage de l'objet
            refreshDisplay(objectBuffer);
        });
    }

    // Affichage des boutons de l'arborescence
    for (let key in object){
        parent.insertAdjacentHTML("beforeend", newButton(0, object[key].name));
    }



    if (object[0].type.includes('calendar') || object[0].type.includes('pdf')) {
        for (let i = 0; i < parent.getElementsByTagName('button').length; i++) {
            parent.getElementsByTagName('button')[i].classList.add('tbltree');
        }

        parent.classList.add('tbltree');
    } else {
        parent.classList.remove('tbltree');
    }

    const btnDown = document.querySelectorAll(".treeBtnDown");

    let request;

    // Ajout des évènements aux boutons de l'arborescence
    btnDown.forEach( buffer => {
        buffer.addEventListener("click", () => {
            if (buffer.classList.contains('active')) return;
            btnDown.forEach(buffer => buffer.classList.remove('active'));
            buffer.classList.add('active');

            switch(object[Array.from(btnDown).indexOf(buffer)].type){
                case "folder":
                    // Ajout de l'index du bouton à l'array path
                    path.push(Array.from(btnDown).indexOf(buffer));

                    if(debug) {
                        console.log("{refreshDisplay, log} down Path : ");
                        console.log(path);
                        console.log("{refreshDisplay, log} down Object : ");
                        console.log(object);
                        console.log("{refreshDisplay, log} down ObjectCache : ");
                        console.log(objectCache);
                    }

                    // Affichage de l'objet
                    refreshDisplay(object[Array.from(btnDown).indexOf(buffer)].content);

                    break;
                case "calendar":
                    console.log(object[Array.from(btnDown).indexOf(buffer)].resource);

                    request = {
                        type: "calendar",
                        content: {
                            resource: object[Array.from(btnDown).indexOf(buffer)].resource
                            }
                    };

                    socket.send(JSON.stringify(request));

                    buffer.classList.add("active");

                    ongletSelector(1);

                    wdw.document.querySelector(".loader-layout").classList.remove("active");
                    wdw.document.querySelector(".loader-subject").textContent="Chargement du calendrier, veuillez patienter ..";

                    break;
                case "pdf":
                    console.log(object[Array.from(btnDown).indexOf(buffer)].resource);

                    request = {
                        type: "pdf",
                        content: {
                            resource: object[Array.from(btnDown).indexOf(buffer)].resource
                        }
                    };

                    socket.send(JSON.stringify(request));

                    ongletSelector(2);

                    wdw.document.querySelector(".loader-layout").classList.remove("active");
                    wdw.document.querySelector(".loader-subject").textContent="Chargement du fichier, veuillez patienter ..";

                    break;
                default:
                    console.error("{refreshDisplay, error} : Unknown object type");
                    break;
            }
            
        });
    });
}