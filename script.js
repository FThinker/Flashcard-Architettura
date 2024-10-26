let allFlashcards = [];        // Array originale delle flashcard
let availableFlashcards = [];  // Array temporaneo per le carte non ancora visualizzate
let currentFlashcardIndex = -1; // Indice della flashcard corrente

// Carica i dati dal file JSON
fetch('edifici.json')
    .then(response => response.json())
    .then(data => {
        allFlashcards = data; // Salva tutte le flashcard originali
        resetAvailableFlashcards(); // Inizializza le carte disponibili per il ciclo attuale
        showNextFlashcard(); // Mostra la prima flashcard
    })
    .catch(error => console.error('Errore nel caricamento delle flashcard:', error));

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
    frontImage.src = flashcard.immagine;
    frontImage.alt = flashcard.nome;
    backContent.innerHTML = `
        <h2>${flashcard.nome}</h2>
    `;

    // Nasconde il bottone "Prossima" finché non si gira la card
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('flashcard').classList.remove('flip');
}

// Funzione per girare la card
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flip');

    // Mostra il bottone "Prossima" solo se la card è girata
    document.getElementById('next-btn').style.display = flashcard.classList.contains('flip') ? 'block' : 'none';
}

// Funzione per passare alla prossima flashcard
function nextFlashcard() {
    showNextFlashcard();
}

// Avvia il caricamento delle flashcard quando la pagina è pronta
document.addEventListener('DOMContentLoaded', loadFlashcards);
