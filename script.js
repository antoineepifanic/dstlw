function parseMana(str) {
    return str.split(/\s*({\w*})\s*/g).filter(Boolean);
}

async function afficherCartes() {
    const baseURL = "https://api.scryfall.com/cards/search?q=e:ltr+lang:fr&format=json&order=set&unique=prints";
    let allCards = [];

    // On commence avec l'URL de base
    let nextPageURL = baseURL;
    let hasMore = true;

    // Tant qu'il y a des cartes à récupérer
    while (hasMore) {
        // On fait la requête
        const response = await fetch(nextPageURL);
        const data = await response.json();

        // On ajoute les cartes reçues à notre tableau
        allCards = allCards.concat(data.data);

        // On vérifie s'il y a une page suivante
        hasMore = data.has_more;
        if (hasMore) {
            nextPageURL = data.next_page;
        }
    }

    // Pour vérifier que ça marche
    console.log("Nombre total de cartes :", allCards.length);

    // Nouveau code pour la question 8
    const template = document.getElementById('card-template');
    const container = document.getElementById('grid-container');

    allCards.forEach(card => {
        // Créer une copie du template
        const cardElement = template.content.cloneNode(true);
        
        // Sélectionner l'image et le paragraphe dans la copie
        const img = cardElement.querySelector('.card-img');
        const p = cardElement.querySelector('p');
        
        // Remplir avec les données de la carte
        img.src = card.image_uris.normal;
        p.textContent = card.printed_name;
        
        // Ajouter la carte au conteneur
        container.appendChild(cardElement);
    });
}

// Appeler la fonction quand la page se charge
document.addEventListener('DOMContentLoaded', afficherCartes);