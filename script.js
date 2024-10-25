let edifici = [];
let currentFlashcardIndex = -1;

// Carica i dati dal file JSON
fetch('edifici.json')
    .then(response => response.json())
    .then(data => {
        edifici = data;
        mostraFlashcardCasuale(); // Mostra una prima flashcard casuale
    })
    .catch(error => console.error('Errore nel caricamento dei dati:', error));

// Mostra una flashcard casuale
function mostraFlashcardCasuale() {
    if (edifici.length === 0) return;

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * edifici.length);
    } while (randomIndex === currentFlashcardIndex);
    currentFlashcardIndex = randomIndex;

    const edificio = edifici[currentFlashcardIndex];
    document.getElementById('flashcard-image').src = edificio.immagine;
    document.getElementById('flashcard-image').alt = edificio.nome;
    document.getElementById('flashcard-name').textContent = edificio.nome;
    document.getElementById('flashcard-author').textContent = "Autore: " + edificio.autore;
    document.getElementById('flashcard-location').textContent = "Luogo: " + edificio.luogo;
    document.getElementById('flashcard-period').textContent = "Periodo: " + edificio.periodo;
    document.getElementById('flashcard-style').textContent = "Stile: " + edificio.stile;

    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flip');
    document.getElementById('next-btn').style.display = 'none';
}

// Funzione per girare la card
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.toggle('flip');

    if (flashcard.classList.contains('flip')) {
        document.getElementById('next-btn').style.display = 'block';
    } else {
        document.getElementById('next-btn').style.display = 'none';
    }
}

// Funzione per passare alla prossima flashcard
function nextFlashcard() {
    mostraFlashcardCasuale();
}
