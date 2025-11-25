document.addEventListener("DOMContentLoaded", () => {
  // 1. Selecionar elementos do DOM
  const searchButton = document.getElementById("search-button");
  const pokemonInput = document.getElementById("pokemon-input");
  const pokemonInfoDiv = document.getElementById("pokemon-info");

  // --- ADICIONADO: início ---
  // Histórico em memória durante a sessão (variável adicionada)
  const searchHistory = [];

  // Elemento do DOM onde o histórico será exibido (deve existir no HTML: <div id="history-list"></div>)
  const historyListDiv = document.getElementById("history-list");
  // --- ADICIONADO: fim ---

  // 2. Adicionar um "ouvinte de evento" ao botão de busca
  searchButton.addEventListener("click", () => {
    // Obter o valor do input e formatá-lo (minúsculas)
    const pokemonNameOrId = pokemonInput.value.toLowerCase().trim();

    // Chamar a função de busca
    if (pokemonNameOrId) {
      fetchPokemon(pokemonNameOrId);
    } else {
      pokemonInfoDiv.innerHTML =
        "<p>Por favor, digite o nome ou ID do Pokémon.</p>";
    }
  });

  // 3. Função principal para buscar o Pokémon na API
  async function fetchPokemon(query) {
    // Limpar a área de informações e mostrar "Carregando..."
    pokemonInfoDiv.innerHTML = "<p>Carregando...</p>";

    try {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${query}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Pokémon não encontrado!");
      }

      const data = await response.json();

      // --- ADICIONADO: início ---
      // Adicionar ao histórico em caso de sucesso (sem duplicatas) e atualizar a exibição
      const name = data.name.toLowerCase();
      if (!searchHistory.includes(name)) {
        searchHistory.push(name);
        displayHistory(); // atualiza o elemento de histórico no DOM
      }
      // --- ADICIONADO: fim ---

      // 4. Exibir os dados do Pokémon
      displayPokemon(data);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
      pokemonInfoDiv.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
    }
  }

  // --- ADICIONADO: início ---
  // Função que renderiza o histórico no elemento historyListDiv
  function displayHistory() {
    if (!historyListDiv) return; // se o elemento não existir no HTML, aborta

    historyListDiv.innerHTML = ""; // limpa antes de renderizar
    if (searchHistory.length === 0) return; // nada a mostrar

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
        fetchPokemon(pokemonName); // refaz a busca sem precisar digitar
      });
      li.appendChild(a);
      ul.appendChild(li);
    });

    historyListDiv.appendChild(ul);
  }
  // --- ADICIONADO: fim ---

  // 5. Função para formatar e exibir os dados no HTML
  function displayPokemon(pokemon) {
    // Formatar os tipos (ex: 'grass', 'poison' -> 'Grama, Venenoso')
    const types = pokemon.types
      .map(
        (typeInfo) =>
          typeInfo.type.name.charAt(0).toUpperCase() +
          typeInfo.type.name.slice(1)
      ) // Capitaliza
      .join(", ");

    // Criar o conteúdo HTML
    const htmlContent = `
            <h2>${pokemon.name} (#${pokemon.id})</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
            <p><strong>Tipo(s):</strong> ${types}</p>
            <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
        `;

    pokemonInfoDiv.innerHTML = htmlContent;
  }
});
