const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

// Listen for form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const word = input.value.trim();
  resultDiv.innerHTML = "";
  errorDiv.textContent = "";

  if (!word) return;

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    displayWord(data[0]);
  } catch (error) {
    errorDiv.textContent = "Sorry, we couldn't find that word.";
  }
});

// Display word details
function displayWord(data) {
  const meaning = data.meanings[0];
  const definition = meaning.definitions[0];

  const wordDiv = document.createElement("div");
  wordDiv.classList.add("word");

  wordDiv.innerHTML = `
    <h2>${data.word}</h2>
    <p class="part">${meaning.partOfSpeech}</p>
    <p><strong>Definition:</strong> ${definition.definition}</p>
    ${definition.example ? `<p><strong>Example:</strong> ${definition.example}</p>` : ""}
    <button id="saveBtn">Save Word</button>
  `;

  resultDiv.appendChild(wordDiv);

  document.getElementById("saveBtn").addEventListener("click", () => {
    wordDiv.classList.toggle("saved");
  });
}