export function newDay(in1, in2){
    return `
        <div class="calendar-day">
            <span class="calendar-day-number">${in1}</span>
            <span class="calendar-day-word">${in2}</span>
        </div>
    `;
}

export function newDay(in1, in2){
    return `
        <div class="calendar-table-column">
            
        </div>
    `;
}

export function newItem(in1, in2){
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
    return `
        <div class="calendar-table-cell td">
            <div class="calendar-table-cell-top">
                <div class="calendar-table-cell-item">
                    <span class="calendar-table-cell-title">R3.15 GESTION DE PROJET 2 : UTILISER LES MÉTHODES DE GESTION DE PROJET</span>
                </div>
                <div class="calendar-table-cell-item">
                    <span class="calendar-table-cell-professor">Bruno GUEGAN</span>
                    <div class="calendar-table-cell-item-right exam">
                        <span>Examen</span>
                    </div>
                </div>
            </div>
            <div class="calendar-table-cell-bottom">
                <div class="calendar-table-cell-item">
                    <i class="fa-regular fa-clock"></i>
                    <span>1h</span>
                </div>
                <div class="calendar-table-cell-item">
                    <i class="fa-regular fa-flag"></i>
                    <span>BUT-RT-ELECTEL</span>
                </div>
            </div>
        </div>
    `;
}