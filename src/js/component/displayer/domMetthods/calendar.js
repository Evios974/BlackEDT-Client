
function pourcentageCurseur() {
    // Récupérer l'heure actuelle
    const date = new Date();
    const heureActuelle = date.getHours();
    const minutesActuelle = date.getMinutes();
    const secondsActuelle = date.getSeconds();

    // Si l'heure est entre 20h et 23h59, retourner 100%
    if (heureActuelle >= 20 && heureActuelle <= 23) {
        return 100;
    }

    // Si l'heure est entre 00h et 7h, retourner 0%
    if (heureActuelle >= 0 && heureActuelle < 7) {
        return 0;
    }

    // Calculer le pourcentage en fonction de l'heure actuelle
    return (((heureActuelle + (minutesActuelle / 60) + (secondsActuelle / (60 * 60))) - 7) / 13) * 100;
}

function deplacerCurseur(){
    const cursor = wdw.document.querySelector(".calendar-table-data-cursor-pointer");

    // Déplacer le curseur en fonction du pourcentage total
    cursor.style.height = pourcentageCurseur() + "%";

    // Afficher la position du curseur dans la console
    console.log(pourcentageCurseur() + "%");
}

export function initCalendar(in1){
    const days = window.wdw.document.querySelectorAll(".calendar-day");
    const tableColumn = window.wdw.document.querySelectorAll(".calendar-table-column");

    days.forEach((day) => {
        day.classList.remove('active');
    });

    // À MODIFIER, ICI ON MET LA DATE D'AUJOURD'HUI SUR UNE SEMAINE DANS LE FUTUR POUR LE DEBUG
    const today = new Date();
    //const today = new Date(new Date().getTime() + 11 * 24 * 60 * 60 * 1000);                        //  Aujourd'hui (modifié pour une semaine à l'avance)
    const tommorow = new Date(today.getTime() +  86400000);                                         //  Le landemain
    const theDayAfter = new Date(tommorow.getTime() + 86400000);                                    //  Le jour d'après
    const theDayAfterThatDay = new Date(theDayAfter.getTime() + 86400000);                          //  Le jour d'après encore après (Au cas où si on est Dimanche)

    // On stocke les dates
    const todayDate = today.getDate();
    const tommorowDate = tommorow.getDate();
    const theDayAfterDate = theDayAfter.getDate();
    const theDayAfterThatDayDate = theDayAfterThatDay.getDate();

    // Dates des jours -1 et -2 à partir d'aujourd'hui
    const todayDateMinusOne = new Date(today.getTime() - 86400000).getDate();
    const todayDateMinusTwo = new Date(today.getTime() - (86400000 * 2)).getDate();

    // On stocke les jours
    const todayWord = today.getDay();
    const tommorowWord = tommorow.getDay();
    const theDayAfterWord = theDayAfter.getDay();
    const theDayAfterThatDayWord = theDayAfterThatDay.getDay();

    // On stocke les divs des affichages de dates
    const topDayNumberDisplay = window.wdw.document.querySelectorAll('.calendar-day .calendar-day-number');
    const topDayWordDisplay = window.wdw.document.querySelectorAll('.calendar-day .calendar-day-word');

    // Switch case pour savoir la partie de la semaine en fonction du jour
    switch (todayWord) {
        /// Première partie de la semaine (3 premiers jours de la semaine)
        case 0: // Dimanche
        case 1: // Lundi
        case 2: // Mardi
        case 3: // Mercredi
            topDayWordDisplay[0].textContent = 'Lun';
            topDayWordDisplay[1].textContent = 'Mar';
            topDayWordDisplay[2].textContent = 'Mer';
            break;

        /// Seconde partie de la semaine (3 dernier jours de la semaine)
        case 4: // Jeudi
        case 5: // Vendredi
        case 6: // Samedi
            topDayWordDisplay[0].textContent = 'Jeu';
            topDayWordDisplay[1].textContent = 'Ven';
            topDayWordDisplay[2].textContent = 'Sam';
            break;
    }

    // Ensuite, on pose les dates
    // Si on est pas Dimanche, on place les dates à partir du jour actuel
    if (todayWord !== 0) {

            switch (todayWord) {
                // Si on est Lundi/Jeudi, on répartie de la manière suivante : aujourd'hui, demain, le jour d'après
                case 1:
                case 4:
                    topDayNumberDisplay[0].textContent = todayDate > 10 ? todayDate : '0' + todayDate;
                    topDayNumberDisplay[1].textContent = tommorowDate > 10 ? tommorowDate : '0' + tommorowDate;
                    topDayNumberDisplay[2].textContent = theDayAfterDate > 10 ? theDayAfterDate : '0' + theDayAfterDate
                    break;
                // Si on est Mardi/Vendredi, on répartie de la manière suivante : hier, aujourd'hui, demain
                case 2:
                case 5:
                    topDayNumberDisplay[0].textContent = todayDateMinusOne > 10 ? todayDateMinusOne : '0' + todayDateMinusOne;
                    topDayNumberDisplay[1].textContent = todayDate > 10 ? todayDate : '0' + todayDate ;
                    topDayNumberDisplay[2].textContent = tommorowDate > 10 ? tommorowDate: '0' + tommorowDate;
                    break;
                // Si on est Mercredi/Samedi, on répartie de la manière suivante : avant-hier, hier, aujourd'hui
                case 3:
                case 6:
                    topDayNumberDisplay[0].textContent = todayDateMinusTwo > 10 ? todayDateMinusTwo : '0' + todayDateMinusTwo;
                    topDayNumberDisplay[1].textContent = todayDateMinusOne > 10 ? todayDateMinusOne : '0' + todayDateMinusOne;
                    topDayNumberDisplay[2].textContent = todayDate > 10 ? todayDate : '0' + todayDate;
                    break;
            }

    // Sinon, on affiche les dates à partir du jour d'après aujourd'hui
    } else {
        topDayNumberDisplay[0].textContent = tommorowDate > 10 ? tommorowDate : '0' + tommorowDate;
        topDayNumberDisplay[1].textContent = theDayAfterDate > 10 ? theDayAfterDate : '0' + theDayAfterDate;
        topDayNumberDisplay[2].textContent = theDayAfterThatDayDate > 10 ? theDayAfterThatDayDate : '0' + theDayAfterThatDayDate;
    }

    // On surligne le jour d'aujourd'hui
    if (todayWord !== 0) {
        switch (todayWord) {
            // Si on est Lundi/Jeudi
            case 1:
            case 4:
                days[0].classList.add('active');
                break;
            // Si one est Mardi/Vendredi
            case 2:
            case 5:
                days[1].classList.add('active');
                break;
            // Si on est Mercredi/Samedi
            case 3:
            case 6:
                days[2].classList.add('active');
                break;
        }
    }

    var columnDate = [];

    // On pose la date des jours en fonction du jour actuel
    // Par exemple : Si on est Mardi, on décale la date d'aujourd'hui sur la deuxième colonne, on s'adapte donc au jour d'aujourd'hui
    // Si on est pas Dimanche, on commence à partir d'aujourd'hui, sinon à partir du landemain
    if (todayWord !== 0) {

        switch (todayWord) {
            // Si on est Lundi/Jeudi, on commence à partir de la première colonne
            case 1:
            case 4:
                columnDate = [todayDate, tommorowDate, theDayAfterDate];
                break;
            // Si on est Mardi/Vendredi, on commence à partir de la seconde colonne
            case 2:
            case 5:
                columnDate = [todayDateMinusOne, todayDate, tommorowDate];
                break;
            // Si on est Mercredi/Samedi, on commence à partir de la troisième colonne
            case 3:
            case 6:
                columnDate = [todayDateMinusTwo, todayDateMinusOne, todayDate];
                break;
        }
    } else {
        columnDate = [tommorowDate, theDayAfterDate, theDayAfterThatDayDate];
    }

    // On clean les colonnes actuelles si elles contiennent des évênements
    tableColumn.forEach((column) => {
        column.innerHTML = "";
    })

    // Boucle sur la colonne d'un jour
    for (let i = 0; i < 3; i++) {
        // Boucle sur les évènements contenu dans l'objet, on sélectionne seulement ceux de la colonne
        for (const event of in1) {
            // Si la date de début de l'évènement correspond au jour de la colonne stockée dans columnDate
            if (new Date(event.start_time).getDate() === columnDate[i]) {

                const duration = event.duration;
                const startHour = new Date(event.start_time).getHours();
                const startMin = new Date(event.start_time).getMinutes();
                const top = ((startHour + (startMin / 60) - 7) / 13) * 100;
                const ht = 7.6923076923076923076923076923077 * duration;
                const tpRegex = /tp/i;
                const tdRegex = /td/i;
                const lastCheckRegex = /RT\d+/g;

                let groupType = '';

                if (tpRegex.test(event.groups[0])) {
                    groupType = 'tp';
                } else if (tdRegex.test(event.groups[0])) {
                    groupType = 'td';
                } else if (lastCheckRegex.test(event.groups)) {
                    groupType = 'cm';
                }

                if (event.subject === 'Vacances' || event.subject === 'Sport/activités facultatives') groupType = 'brk';

                let teachers = '';

                // On concatenne tous les professeurs dans une seule chaîne de caractères si il y en a plusieurs
                if (event.teacher.length > 1) {
                    for (let i=0; i < event.teacher.length; i++) {
                        // Si on est au dernier prof, on termine la chaîne
                        if (i === event.teacher.length - 1) {
                            teachers += event.teacher[i];
                        // Si on est pas au dernier prof, on sépare d'une virgule le prochain prof
                        } else {
                            teachers += event.teacher[i] + ', ';
                        }
                    }
                // Si il n'y a qu'un seul prof
                } else {
                    teachers = typeof event.teacher[0] !== 'undefined' ? event.teacher[0] : '';
                }



                let item = `
                    <div class="calendar-table-cell ${groupType}" style="height: ${ht + "%"};top: ${top + "%"}">
                        <div class="calendar-table-cell-top">
                            <div class="calendar-table-cell-item">
                                <span class="calendar-table-cell-title">${event.subject}</span>
                            </div>
                            <div class="calendar-table-cell-item">
                                <span class="calendar-table-cell-professor">${teachers}</span>
                                ${event.exam ?
                                `<div class="calendar-table-cell-item-right exam">
                                    <span>Examen</span>
                                </div>` : ''}
                            </div>
                        </div>
                        <div class="calendar-table-cell-bottom">
                            <div class="calendar-table-cell-item">
                                <i class="fa-regular fa-clock"></i>
                                <span>${duration + 'h'}</span>
                            </div>
                            <div class="calendar-table-cell-item">
                                <i class="fa-regular fa-flag"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                    </div>
                `;

                tableColumn[i].insertAdjacentHTML('beforeend', item);

            }
        }

    }

    // Initialiser le curseur
    deplacerCurseur();

    // Mettre à jour le curseur toutes les secondes
    setInterval(deplacerCurseur, 60000);

}