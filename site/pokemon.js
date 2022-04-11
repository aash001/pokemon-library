//DOM Objects
const pokemonListing = document.querySelector(".pokemon-details");
const pokeAbilities = document.querySelector(".abilities");




//functions
function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

function addPokemonImage(pokemon) {
    const pokePics = document.querySelector("figure")
    pokePics.classList.add('pokeCard')
    pokePics.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <img src="${pokemon.sprites.back_default}" alt = "${pokemon.name}" />
        <figcaption>${capitalizeFirstLetter(pokemon.name)}</figcaption>
            `
}

function addPokeAbilities(Ab) {
    const pokeAbility = Ab.abilities.map(result => result.ability)
    const pokeURLS = pokeAbility.map(result => result.url)
    const pokeFetch = pokeURLS.map(url => fetch(url).then(response => response.json()))
    return Promise.all(pokeFetch).then(pokeResponses => {
        createPokeList();
    })
}

function createPokeList() {
    const pokeLi = document.createElement("li")
    pokeLi.innerHTML = `
    <span class="ability-name">Ability's name goes here</span> 
    <span class="ability-short-description">Ability's short description goes here</span>
    `
    pokeAbilities.append(pokeLi)
}

//fetch
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addPokemonImage(parsedResponse)
        console.log(parsedResponse);
        console.log(parsedResponse.abilities[0].ability.url);
        addPokeAbilities(parsedResponse)
    })