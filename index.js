const form = document.getElementById("searchform");
const input = document.getElementById("result-output"); 
const result = document.getElementById("results"); 

form.addEventListener("submit",async function(event) {
    event.preventDefault();
    const word = input.value.trim(); 
    if (!word) {
        result.innerHTML = "<p>Please enter a word to search.</p>";
        return;
    }
await  fetchWord(word);
});

async function fetchWord(word) {
    try{
        result.innerHTML = "<p>Loading...</p>";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  
    if (!response.ok) {
        throw new Error("Word not found");
    }
    const data = await response.json();
    displayWord(data[0]);
    } catch (error) {
    result.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

function displayWord(data) {
  const meaning = data.meanings[0];
  const definition = meaning.definitions[0].definition;

  const synonyms = meaning.definitions[0].synonyms || [];
  const synonymText = synonyms.length
    ? synonyms.join(", ")
    : "No synonyms available";

  const audio = data.phonetics?.find(p => p.audio)?.audio;

  result.innerHTML = `
    <h2>${data.word}</h2>
    <p><strong>Definition:</strong> ${definition}</p>
    <p><strong>Synonyms:</strong> ${synonymText}</p>
    <p><strong>Part of Speech:</strong> ${meaning.partOfSpeech}</p>
  `;

  if (audio) {
    const audioBtn = document.createElement("button");
    audioBtn.textContent = "▶ Play Pronunciation";
    audioBtn.classList.add("audio-btn");

    audioBtn.addEventListener("click", () => {
      new Audio(audio).play();
    });

    result.appendChild(audioBtn);
  }
}


console.log("JS is connected");