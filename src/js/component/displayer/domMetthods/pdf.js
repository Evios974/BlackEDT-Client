export function initPdf(in1) {
    // Décodez les données en base64
    const decodedData = Uint8Array.from(atob(in1), c => c.charCodeAt(0));

    // Créez un objet Blob à partir des données décodées
    const blob = new Blob([decodedData], { type: 'application/pdf' });

    // Générez un object URL à partir du Blob
    const pdfURL = URL.createObjectURL(blob);

    // Mettez à jour l'embed avec le nouveau lien PDF
    wdw.document.querySelector(".pdfViewDpl").setAttribute('src', pdfURL);
}