// === MAPA DE TIPOS POKÉMON E CORES ===
const pokemonTypes = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

// === MAPA DE CORES PARA ESTATÍSTICAS ===
const statColors = {
  hp: "#FF5959",
  attack: "#F08030",
  defense: "#F8D030",
  "special-attack": "#7038F8",
  "special-defense": "#78C850",
  speed: "#F85888",
};

document.addEventListener("DOMContentLoaded", () => {
  // === ELEMENTOS DO DOM ===
  const searchButton = document.getElementById("search-button");
  const pokemonInput = document.getElementById("pokemon-input");
  const pokemonInfoDiv = document.getElementById("pokemon-info");
  const historyListDiv = document.getElementById("history-list");
  const navDiv = document.getElementById("listaNavegacao");

  // === VARIÁVEIS GLOBAIS ===
  const searchHistory = [];
  let listLimit = 15;
  let listOffset = 0;

  // === BUSCAR POKÉMON POR NOME ===
  async function fetchPokemon(query) {
    pokemonInfoDiv.innerHTML = "<p>Carregando...</p>";
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (!res.ok) throw new Error("Pokémon não encontrado!");

      const data = await res.json();

      // Adiciona ao histórico (sem duplicatas)
      const name = data.name.toLowerCase();
      if (!searchHistory.includes(name)) {
        searchHistory.push(name);
        displayHistory();
      }

      displayPokemon(data);
    } catch (err) {
      console.error("Erro ao buscar Pokémon:", err);
      pokemonInfoDiv.innerHTML = `<p style="color: red;">Erro: ${err.message}</p>`;
    }
  }

  // === FORMATAR ESTATÍSTICAS EM BARRAS DE PROGRESSO ===
  function formatStats(stats) {
    const maxStat = 255; // valor máximo teórico de uma estatística

    return stats
      .map((stat) => {
        const statName = stat.stat.name; // ex: "special-attack"
        const baseStat = stat.base_stat;
        const percentage = (baseStat / maxStat) * 100;

        // Busca a cor usando o nome exato, com fallback
        const statColor = statColors[statName] || "#999999";

        // Formata o nome para exibição (special-attack → Special Attack)
        const displayName = statName
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return `
          <div style="margin: 8px 0;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-weight: bold;">${displayName}:</span>
              <span style="font-weight: bold;">${baseStat}</span>
            </div>
            <div style="background-color: rgba(255,255,255,0.3); border-radius: 4px; overflow: hidden; height: 20px;">
              <div style="background-color: ${statColor}; width: ${percentage}%; height: 100%; transition: width 0.3s ease;"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // === EXIBIR DETALHES DO POKÉMON COM COR DINÂMICA ===
  function displayPokemon(pokemon) {
    // 1. Pegar o primeiro tipo do Pokémon
    const primaryType = pokemon.types[0].type.name;

    // 2. Buscar a cor correspondente no mapa
    const backgroundColor = pokemonTypes[primaryType] || "#999999";

    // 3. Formatar os tipos com cores
    const types = pokemon.types
      .map((typeInfo) => {
        const typeName = typeInfo.type.name;
        const typeColor = pokemonTypes[typeName] || "#999";
        return `<span style="background-color: ${typeColor}; color: white; padding: 4px 8px; border-radius: 4px; margin-right: 4px;">${typeName.toUpperCase()}</span>`;
      })
      .join("");

    // 4. Formatar as estatísticas em barras
    const statsHTML = formatStats(pokemon.stats);

    // 5. Criar o conteúdo HTML
    const htmlContent = `
      <h2 style="color: white;">${pokemon.name} (#${pokemon.id})</h2>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
      <p style="color: white;"><strong>Tipo(s):</strong> ${types}</p>
      <p style="color: white;"><strong>Altura:</strong> ${
        pokemon.height / 10
      } m</p>
      <p style="color: white;"><strong>Peso:</strong> ${
        pokemon.weight / 10
      } kg</p>
      
      <hr style="border: 1px solid rgba(255,255,255,0.3); margin: 16px 0;">
      
      <h3 style="color: white;">Estatísticas</h3>
      ${statsHTML}
    `;

    // 6. Aplicar a cor de fundo ao card
    pokemonInfoDiv.innerHTML = htmlContent;
    pokemonInfoDiv.style.backgroundColor = backgroundColor;
    pokemonInfoDiv.style.padding = "16px";
    pokemonInfoDiv.style.borderRadius = "8px";
    pokemonInfoDiv.style.color = "white";
  }

  // === EXIBIR HISTÓRICO DE BUSCAS ===
  function displayHistory() {
    if (!historyListDiv) return;

    historyListDiv.innerHTML = "";
    if (searchHistory.length === 0) return;

    const title = document.createElement("h3");
    title.textContent = "Histórico de buscas";
    historyListDiv.appendChild(title);

    const ul = document.createElement("ul");
    ul.style.paddingLeft = "18px";

    searchHistory.forEach((pokemonName) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent =
        pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        fetchPokemon(pokemonName);
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    historyListDiv.appendChild(ul);
  }

  // === RENDERIZAR LISTA DE POKÉMONS ===
  function renderPokemonList(items, append = false) {
    if (!append) {
      navDiv.innerHTML = "";
    }

    let ul = navDiv.querySelector("ul");
    if (!ul) {
      ul = document.createElement("ul");
      navDiv.appendChild(ul);
    }

    items.forEach((item) => {
      const match = item.url.match(/\/pokemon\/(\d+)\//);
      const id = match ? match[1] : null;
      const imgSrc = id
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        : "";

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = item.name;
      a.dataset.name = item.name;

      if (imgSrc) {
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = item.name;
        li.appendChild(img);
      }

      a.addEventListener("click", (e) => {
        e.preventDefault();
        fetchPokemon(e.currentTarget.dataset.name);
      });

      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  // === BUSCAR LISTA DE POKÉMONS ===
  async function fetchPokemonList(limit = listLimit, offset = listOffset) {
    if (!navDiv) return;
    if (offset === 0) navDiv.innerHTML = "Carregando lista...";

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Erro ao carregar lista de Pokémon");
      const json = await res.json();
      renderPokemonList(json.results, offset > 0);
    } catch (err) {
      console.error(err);
      navDiv.innerHTML = "Erro ao carregar lista.";
    }
  }

  // === EVENT LISTENERS ===
  searchButton.addEventListener("click", () => {
    const query = pokemonInput.value.toLowerCase().trim();
    if (query) {
      fetchPokemon(query);
    } else {
      pokemonInfoDiv.innerHTML =
        "<p>Por favor, digite o nome ou ID do Pokémon.</p>";
    }
  });

  // === FUNÇÕES GLOBAIS ===
  window.loadMorePokemons = function () {
    listOffset += listLimit;
    fetchPokemonList(listLimit, listOffset);
  };

  window.resetList = function () {
    navDiv.innerHTML = "";
    pokemonInfoDiv.innerHTML = "";
    pokemonInfoDiv.style.backgroundColor = "white";
    pokemonInfoDiv.innerHTML = "";
    navDiv.innerHTML = "";
    listOffset = 0;
    searchHistory.length = 0;
    fetchPokemonList();
  };

  // === CARREGAR INICIAL ===
  fetchPokemonList();
});
