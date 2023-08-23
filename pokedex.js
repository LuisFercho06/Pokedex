const pokemonListElement = document.getElementById('pokemonList');
const searchInput = document.getElementById('searchInput');

// Fetch Pokémon data from the JSON file
fetch('https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json')
  .then(response => response.json())
  .then(data => createPokemonCards(data));

// Create Pokémon cards and display them
function createPokemonCards(pokemonData) {
  pokemonListElement.innerHTML = '';
  pokemonData.forEach(pokemon => {
    const card = createPokemonCard(pokemon);
    pokemonListElement.appendChild(card);
  });
}

// Create a single Pokémon card
function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.textContent = pokemon.name;
  card.addEventListener('click', () => showPokemonDetails(pokemon));

  return card;
}

// Show Pokémon details in a modal
function showPokemonDetails(pokemon) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>${pokemon.name}</h2>
      <p>Type: ${pokemon.type.join(', ')}</p>
      <!-- Add more details here, like weight, moves, etc. -->
    </div>
  `;

  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.remove();
  });

  document.body.appendChild(modal);
}

// Search Pokémon by name
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  createPokemonCards(filteredPokemon);
});