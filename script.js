let allFlashcards = [];       // Array con tutte le flashcard del modulo corrente
let availableFlashcards = []; // Array temporaneo per le carte non ancora visualizzate
let currentFlashcardIndex = -1; // Indice della flashcard corrente

// Funzione per selezionare il modulo (carica il file JSON corretto)
function selectModule(module) {
    const jsonFile = module === 'modulo2' ? 'edifici-modulo2.json' : 'edifici.json';
    loadFlashcards(jsonFile);
}

// Funzione per caricare le flashcard dal file JSON specificato
function loadFlashcards(jsonFile) {
    fetch(jsonFile)
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
    if (availableFlashcards.length === 0) {
        resetAvailableFlashcards();
    }

    const randomIndex = Math.floor(Math.random() * availableFlashcards.length);
    const flashcard = availableFlashcards[randomIndex];
    availableFlashcards.splice(randomIndex, 1);

    displayFlashcard(flashcard);
}

// Funzione per impostare il contenuto della flashcard
function displayFlashcard(flashcard) {
    const frontImage = document.querySelector('.flashcard .front img');
    const backContent = document.querySelector('.flashcard .back');

    frontImage.src = flashcard.immagine;
    frontImage.alt = flashcard.nome;
    backContent.innerHTML = `
        <h2>${flashcard.nome}</h2>
    `;

    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('flashcard').classList.remove('flip');
}

// Funzione per girare la card
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flip');

    document.getElementById('next-btn').style.display = flashcard.classList.contains('flip') ? 'block' : 'none';
}

// Funzione per passare alla prossima flashcard
function nextFlashcard() {
    showNextFlashcard();
}

// Carica il modulo 1 all'avvio della pagina
document.addEventListener('DOMContentLoaded', () => selectModule('modulo1'));
