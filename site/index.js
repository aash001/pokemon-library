//DOM Objects
const pokemonListing = document.querySelector(".pokemon-listing");
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');



//Functions
function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

function addPokemonImage(pokemon) {
    const pokePics = document.createElement("figure")
    pokePics.classList.add('pokeCard')
    pokePics.innerHTML = `
    <a href="pokemon.html?pokemon=${pokemon.name}">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <figcaption>${capitalizeFirstLetter(pokemon.name)}</figcaption>
        <div class = "pokeNumber">${pokemon.id}</div>
    </a>
    `
    pokemonListing.append(pokePics)
}


//Fetch
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50"
fetch(url)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        responses.forEach(response => {
            addPokemonImage(response);
        })
    })