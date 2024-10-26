let allFlashcards = [];       // Array per le flashcard di un modulo selezionato
let availableFlashcards = []; // Flashcard ancora da visualizzare nel modulo selezionato

// Funzione per selezionare il modulo
function selectModule(module) {
    const jsonFile = module === 'modulo2' ? 'edifici-modulo2.json' : 'edifici.json';
    loadFlashcards(jsonFile);
}

// Funzione per caricare le flashcard dal file JSON specificato
function loadFlashcards(jsonFile) {
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            allFlashcards = data; // Aggiorna l'array con le flashcard del modulo selezionato
            resetAvailableFlashcards(); // Inizializza le carte disponibili per il ciclo attuale
            showNextFlashcard(); // Mostra la prima flashcard del modulo selezionato
        })
        .catch(error => console.error('Errore nel caricamento delle flashcard:', error));
}

// Funzione per riempire l'array delle carte disponibili
function resetAvailableFlashcards() {
    availableFlashcards = [...allFlashcards]; // Crea una copia di allFlashcards
}

// Funzione per mostrare una nuova flashcard
function showNextFlashcard() {
    if (availableFlashcards.length === 0) {
        resetAvailableFlashcards(); // Ricarica le carte del modulo se tutte sono state visualizzate
    }

    const randomIndex = Math.floor(Math.random() * availableFlashcards.length);
    const flashcard = availableFlashcards[randomIndex];
    availableFlashcards.splice(randomIndex, 1); // Rimuove la carta mostrata

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

// Avvia con il modulo 1 di default quando la pagina è pronta
document.addEventListener('DOMContentLoaded', () => selectModule('modulo1'));
