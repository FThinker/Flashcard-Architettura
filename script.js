// Array originale di flashcard (verrà popolato dai dati JSON)
let allFlashcards = [];
let availableFlashcards = []; // Array temporaneo per le carte non ancora visualizzate

// Funzione per caricare le flashcard dal file JSON
function loadFlashcards() {
    fetch('edifici.json')
        .then(response => response.json())
        .then(data => {
            allFlashcards = data; // Salva tutte le flashcard originali
            resetAvailableFlashcards(); // Inizializza le carte disponibili per il ciclo attuale
            showNextFlashcard(); // Mostra la prima flashcard
        })
        .catch(error => console.error('Errore nel caricamento delle flashcard:', error));
}

// Funzione per inizializzare l'array delle carte disponibili
function resetAvailableFlashcards() {
    availableFlashcards = [...allFlashcards]; // Copia di allFlashcards per il ciclo corrente
}

// Funzione per mostrare una nuova flashcard
function showNextFlashcard() {
    // Se l'array delle flashcard disponibili è vuoto, resetta l'array
    if (availableFlashcards.length === 0) {
        resetAvailableFlashcards();
    }

    // Estrai una flashcard casuale dall'array disponibile
    const randomIndex = Math.floor(Math.random() * availableFlashcards.length);
    const flashcard = availableFlashcards[randomIndex];

    // Rimuovi la flashcard estratta dall'array disponibile
    availableFlashcards.splice(randomIndex, 1);

    // Mostra la flashcard (passa i dati alla funzione che gestisce la visualizzazione)
    displayFlashcard(flashcard);
}

// Funzione per impostare il contenuto della flashcard
function displayFlashcard(flashcard) {
    const frontImage = document.querySelector('.flashcard .front img');
    const backContent = document.querySelector('.flashcard .back');

    // Imposta l'immagine e i dettagli sul retro della flashcard
    frontImage.src = flashcard.image;
    backContent.innerHTML = `
        <h2>${flashcard.name}</h2>
        <p><strong>Autore:</strong> ${flashcard.author}</p>
        <p><strong>Luogo:</strong> ${flashcard.location}</p>
        <p><strong>Periodo:</strong> ${flashcard.period}</p>
        <p><strong>Stile:</strong> ${flashcard.style}</p>
        <button onclick="showNextFlashcard()">Prossima</button>
    `;
}

// Avvia il caricamento delle flashcard quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadFlashcards);
