//DOM Objects
const pokemonListing = document.querySelector(".pokemon-details");
const pokeAbilities = document.querySelector(".abilities");

//fetch
const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)

fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addPokemonImage(parsedResponse)
        addPokeAbilities(parsedResponse)
    })

//functions
function capitalizeFirstLetter(someString) {
    return someString.charAt(0).toUpperCase() + someString.slice(1)
}

function addPokemonImage(pokemon) {
    const pokePics = document.querySelector("figure")
    pokePics.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
        <img src="${pokemon.sprites.back_default}" alt = "${pokemon.name}"/>
        <img src="${pokemon.sprites.front_shiny}" alt="${pokemon.name}"/>
        <img src="${pokemon.sprites.back_shiny}"alt="${pokemon.name}"/>
        <figcaption class ="pokeName">${capitalizeFirstLetter(pokemon.name)}</figcaption>
            `
}

function addPokeAbilities(Ab) {
    const pokeAbility = Ab.abilities.map(result => result.ability)
    const pokeURLS = pokeAbility.map(result => result.url)
    const pokeFetch = pokeURLS.map(url => fetch(url).then(response => response.json()))
    return Promise.all(pokeFetch).then(pokeResponses => {
        pokeResponses.forEach(response => {
            createPokeList(response);
        })
    })
}

function createPokeList(abilityObject) {
    const pokeLi = document.createElement("li")
    pokeLi.innerHTML = `
    <span class="ability-name">${capitalizeFirstLetter(abilityObject.name)}</span>
    <span class="ability-short-description">${pokeAbilityShortEn(abilityObject)}</span>
    `
    pokeAbilities.append(pokeLi)
}

function pokeAbilityShortEn(effectObj) {
    const test = effectObj.effect_entries.find(element => element.language.name == "en")
    return test.short_effect
}