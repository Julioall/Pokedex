const nomePokemon = document.querySelector(".pokemon_name");
const numeroPokemon = document.querySelector(".pokemon_number");
const imagemPokemon = document.querySelector(".pokemon_image");

const formularioPesquisa = document.querySelector("form");
const campoPesquisa = document.querySelector(".input_search");

const botaoAnterior = document.querySelector(".btn_prev");
const botaoProximo = document.querySelector(".btn_next");

let pokemonAtual = 1;

const buscarDadosPokemon = async (pokemon) => {
  const respostaAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (respostaAPI.status === 200) {
    return await respostaAPI.json();
  }
};

const exibirPokemonNaTela = async (pokemon) => {
  nomePokemon.innerHTML = "carregando...";
  numeroPokemon.innerHTML = "";

  const dados = await buscarDadosPokemon(pokemon);

  if (dados) {
    imagemPokemon.style.display = "block";
    nomePokemon.innerHTML = dados.name;
    numeroPokemon.innerHTML = dados.id;
    imagemPokemon.src =
      dados.sprites.versions["generation-v"][
        "black-white"
      ].animated.front_default;

    campoPesquisa.value = "";
  } else {
    imagemPokemon.style.display = "none";
    nomePokemon.innerHTML = "não encontrado!";
    numeroPokemon.innerHTML = "";
  }
};

formularioPesquisa.addEventListener("submit", (event) => {
  event.preventDefault();
  exibirPokemonNaTela(campoPesquisa.value.toLowerCase());
});

botaoAnterior.addEventListener("click", () => {
  if (pokemonAtual > 1) {
    pokemonAtual -= 1;
    exibirPokemonNaTela(pokemonAtual);
  }
});

botaoProximo.addEventListener("click", () => {
  pokemonAtual += 1;
  exibirPokemonNaTela(pokemonAtual);
});

exibirPokemonNaTela(pokemonAtual);
