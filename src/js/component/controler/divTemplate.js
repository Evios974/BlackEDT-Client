export function newButton(in1, in2){
    let icon;

    // Définition de l'icône en fonction du nom du bouton
    switch (in2){
        case "Calendrier":
            icon = 'fa-calendar-days';
            break;
        case "Salles":
            icon = 'fa-door-open';
            break;
        case "Notes":
            icon = 'fa-list-check';
            break;
        default:
            //icon = 'fa-bug';
            icon = 'fa-graduation-cap';
            break;
    }

    // Définition du bouton en fonction du type de bouton
    switch (in1){
        // Si le bouton est un bouton de dossier
        case 0:
            return `
                <button class="treeBtnDown"><i class="fa-solid ${icon}"></i><span>${in2}</span></button>
            `;
        // Si le bouton est un bouton de retour
        case 1:
            return `
                <button class="treeBtnUp"><i class="fa-solid fa-arrow-left"></i><span>Retour</span></button>
            `;
        // Si le bouton n'est pas valide
        default :
            return console.error("{newButton, error} input button type not set");
    }
}