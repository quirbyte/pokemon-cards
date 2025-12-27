const loadBtn = document.querySelector("#loadBtn");
const cardsContainer = document.querySelector("#cards");

loadBtn.addEventListener("click", loadCards);

async function loadCards() {
  const range = Number(document.getElementById("count").value);
  const type = document.getElementById("type").value;

  if (!range || range <= 0) {
    alert("Enter valid count");
    return;
  }

  cardsContainer.innerHTML = "Loading.....";
  cardsContainer.innerHTML = "";

  let rendered = 0;

  while (rendered < range) {
    const randomId = Math.floor(Math.random() * 150) + 1;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );

    const pokemon = response.data;

    const hasType =
      type === "all" ||
      pokemon.types.some((t) => t.type.name === type);

    if (!hasType) continue;

    renderCard(pokemon);
    rendered++;
  }
}


function renderCard(pokemon) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${pokemon.sprites.front_default}" />
    <h3>${pokemon.name}</h3>
    <div class="types">
      ${pokemon.types.map((t) => t.type.name).join(", ")}
    </div>
  `;

  cardsContainer.appendChild(card);
}
