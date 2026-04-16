const form = document.getElementById("form");
const result = document.getElementById("result");
const error = document.getElementById("error");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const word = document.getElementById("word").value;

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      error.textContent = "";

      const definition =
        data[0].meanings[0].definitions[0].definition;

      result.textContent = definition;
    })
    .catch(() => {
      result.textContent = "";
      error.textContent = "Word not found!";
    });
    const phonetic = data.phonetics[0];
  document.getElementById("phonetic").textContent = phonetic?.text || "No pronunciation available";
});