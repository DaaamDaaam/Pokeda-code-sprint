const setsListHTML = document.getElementById("setsList");
const choicePokemonHTML = document.getElementById("choicePokemon");
let userPokemonChoices = [];

fetch("https://api.pokemontcg.io/v2/sets/")

  .then((response) => response.json())
  .then((data) => {
    const setsList = data.data;
    
    setsList.map((set) => {
      console.log(set);
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<img src="${set.images.logo}" alt=""/>`;
      setsListHTML.append(card);
      
      card.addEventListener("click", function () {
        setsListHTML.remove();
        choicePokemonHTML.style.display = "flex";
        
        fetch(`https://api.pokemontcg.io/v2/cards?q= set.id:${set.id}`)
          .then((response) => response.json())
          .then((data) => {
            let pokemons = data.data;

            console.log(pokemons[0]);

            let nbrCartes = set.total;
            console.log(nbrCartes)

            for(let i = 0; i < nbrCartes; i++) {
              showPokemon(pokemons[i]);
            }
            
          });
      });
    });
  });

function showPokemon(pokemon) {

  let card = document.createElement("div");

  card.className = "pokemon-card";
  card.innerHTML = `<img src="${pokemon.images.large}" alt=""/>`;

  card.addEventListener("click", function () {
    userPokemonChoices.push(pokemon);
    console.log(userPokemonChoices);
  });

  choicePokemonHTML.append(card);

}