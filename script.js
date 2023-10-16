
let allPokemons = [];
let allFromApi = [];
let allFromApiSpecies = [];
let allFromApiChain = [];

let allPokemonDetails = [];
let allFromApiTypes = [];
let allGermanPokemonNames = [];
let evolution = [];
let timerStartSec = 3;
let upto = 0;
let limit = 0;
let language = [];
let offset = 0;
let z = 0;
let loadCounter = 0;
let failedEvolves = [];
let newPokemonsInDetails = [];
let inputCounter = 0;
let counterStats = 0;
let fetchCounter = 0;



async function loadStartPage() {
    renderUserInputForm();
}


async function loadPokemons() {
    let count = 0;
    loadScreen(count);
    await fetchPokemons();
};


async function fetchMorePokemons() {
    fetchCounter++
    if (fetchCounter === 1) {
        limit = limit + offset;
        let url = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=${limit}`
        let response = await fetch(url);
        let responseAsJS = await response.json();
        allPokemons.push(await responseAsJS);
        await loadPokemonsFunctions();
        fetchCounter = 0;
    } else {
        return false;
    }

}



async function fetchPokemons() {

    if (typeof document.getElementById("pokemon-value-start").value === "string" && document.getElementById("pokemon-value-start").value.match(/\d+/g) === null) {
        await fetchPokemonName();
    }
    if (+document.getElementById("pokemon-value-start").value === 0) {
        fetchPokemonsIfStartIdEqToZero();
    }
    else if (+document.getElementById("pokemon-value-start").value > 0) {
        fetchPokemonIfStartIdGtZero();
    }else{
        fetchPokemonsElse();
    }
}

function errorFunction(){
    renderUserInputForm();
    document.getElementById("pokemon-value-start").classList.add("input-failure");
    document.getElementById("pokemon-value-start").placeholder="POKEMON NOT FOUND! CHECK INPUT"
    document.getElementById("load_screen").classList.add("d-none");

}

async function fetchPokemonsElse(){
    limit += 3;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJS = await response.json().catch(errorFunction);
    allPokemons.push(await responseAsJS);
    await loadPokemonsFunctions();
    
}

async function fetchPokemonName(){
    let pokemonValueName = document.getElementById("pokemon-value-start").value.toLowerCase();
    let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonValueName}`;
    let responsePokemonUrl = await fetch(pokemonUrl);
    let responsePokemonUrlAsJs = await responsePokemonUrl.json().catch(errorFunction);
    let id = responsePokemonUrlAsJs.id;
    offset = id-1;
}


async function fetchPokemonsIfStartIdEqToZero(){
    offset = 0;
    limit += 3;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJS = await response.json();
    allPokemons.push(await responseAsJS);
    await loadPokemonsFunctions();
}

async function fetchPokemonIfStartIdGtZero(){
    offset = +document.getElementById("pokemon-value-start").value - 1;
    limit += 3;
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let responseAsJS = await response.json();
    allPokemons.push(await responseAsJS);
    await loadPokemonsFunctions();
}


function invalidInputeUserForm() {
    inputValue = "";
    renderUserInputForm();
    document.getElementById('pokemon-value').classList.add("input-failure");
    document.getElementById('pokemon-value').placeholder = "Pokemon not found! , check your input";
}

async function loadPokemonsFunctions() {
    await loadAllfromAPI();
    await loadPokemonSpecies();
    await loadPokemonChains();
    await getGermanNames();
    await loadPokemonDetails();
    await loadPokemonDetailsFilter();
    await renderPokemonCards(limit - 3);
    loadScreen(1);

}


async function loadAllfromAPI() {
    let lastArray = allPokemons.length - 1;
    for (let i = 0; i < allPokemons[lastArray]['results'].length; i++) {
        if (await allPokemons[lastArray]['results'][i]['url'] && await allPokemons[lastArray]['results'][i]['url'] != null) {
            let url = await allPokemons[lastArray]['results'][i]['url'];
            let response = await fetch(url);
            let responseAsJs = await response.json();
            allFromApi.push(await responseAsJs);
            countLoadedPokemons(i);
        } else {
            console.log("null");
        }
    }
}

async function loadPokemonSpecies() {
    if (allPokemonDetails.length == 0) {
        for (let i = 0; i < allFromApi.length; i++) {
            await loadPokemonSpeciesIf(i);
            let j = i;
            countLoadedPokemons("", j);
        }
    } else {
        for (let i = allPokemonDetails.length; i < allFromApi.length; i++) {
            await loadPokemonSpeciesElse(i);
        }
    }
}


async function loadPokemonSpeciesIf(i) {
    let url = allFromApi[i]['species']['url'];
    let response = await fetch(url);
    let responseAsJs = await response.json();
    allFromApiSpecies.push(responseAsJs)
}


async function loadPokemonSpeciesElse(i) {
    let url = allFromApi[i]['species']['url'];
    let response = await fetch(url);
    let responseAsJs = await response.json();
    allFromApiSpecies.push(responseAsJs);
}


async function loadPokemonChains() {
    if (allPokemonDetails.length == 0) {
        for (let i = 0; i < allFromApiSpecies.length; i++) {
            await loadPokemonChainsIf(i);
            let x = i;
            countLoadedPokemons("", "", x);
        }
    } else if (allPokemonDetails.length > 0) {
        for (i = allPokemonDetails.length; i < allFromApiSpecies.length; i++) {
            await loadPokemonChainsElse(i);
        }
    } else { console.log("Failure in PokemonChain") };
}

async function loadPokemonChainsIf(i) {
    let url = allFromApiSpecies[i]['evolution_chain']['url'];
    let response = await fetch(url);
    let responseAsJs = await response.json();
    allFromApiChain.push(responseAsJs);
}

async function loadPokemonChainsElse(i) {
    let url = allFromApiSpecies[i]['evolution_chain']['url'];
    let response = await fetch(url);
    let responseAsJs = await response.json();
    allFromApiChain.push(responseAsJs);
}


async function loadPokemonDetails() {
    for (let z = 0; z < allFromApi.length; z++) {
        getEvolvesImages(z);
        let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${z}`;
        allPokemonDetails.push({ "Liked": "unliked", "Evolutions": getEvolves(z), "About": await getPokemonAbout(z), "species": getPokemonSpeciesUrl(z), "stats": [{ "name": getPokemonStatsName(z), "base_stat": getPokemonStatsBaseStats(z) }], "weight": getPokemonWeight(z), "height": getPokemonHeight(z), "types": await getPokemonTypes(z), "name": getPokemonName(z), "url": pokemonUrl, "Portrait": getPokemonPortrait(z), "smallImage": getPokemonSmallImages(z), "ID": getPokemonID(z) })
    }
}


async function loadPokemonDetailsFilter() {
    let pokemonsUnique = {}
    allPokemonDetails = allPokemonDetails.filter(function (currentObject) {
        if (currentObject.name in pokemonsUnique && currentObject.Evolutions != null) {
            return false;
        } else {
            pokemonsUnique[currentObject.name] = true;
            return true;
        }
    });
    limit = allPokemonDetails.length;
}



function getPokemonName(i) {
    if (language.indexOf("De") == -1) {
        return allFromApi[i]['name'];
    } else {
        return allFromApiSpecies[i].names[5].name
    }
}


function getPokemonSmallImages(i) {
    return allFromApi[i]['sprites']['front_shiny'];
}


function getPokemonID(i) {
    return allFromApi[i]['id'];
}


async function getPokemonTypes(i) {
    let pokemonTypes = allFromApi[i]['types'];
    let pokemonTypeArray = [];
    if (language.indexOf("De") == -1) {
        for (let i = 0; i < pokemonTypes.length; i++) {
            pokemonTypeArray.push(pokemonTypes[i]['type']['name']);
        }
        return pokemonTypeArray;
    } else {
        for (let i = 0; i < pokemonTypes.length; i++) {
            let germanType = await getGermanTypes(pokemonTypes[i]['type']['url']);
            pokemonTypeArray.push(germanType);
        }
        return pokemonTypeArray;
    }
}


function getPokemonPortrait(i) {
    let pokemonPortrait = allFromApi[i]['sprites']['other']['official-artwork']['front_default'];
    return pokemonPortrait;
}

function getPokemonHeight(i) {
    let height = allFromApi[i]['height'];
    return height;
}

function getPokemonWeight(i) {
    let weight = allFromApi[i]['weight'];
    return weight;
}

function getPokemonStatsName(i) {
    let pokemonStatsName = [];
    for (let j = 0; j < allFromApi[i]['stats'].length; j++) {
        let pokemonStatName = allFromApi[i]['stats'][j]['stat']['name'];
        pokemonStatsName.push(pokemonStatName);

    }
    return pokemonStatsName;
}

function getPokemonStatsBaseStats(i) {
    let pokemonStatsValues = [];
    for (let j = 0; j < allFromApi[i]['stats'].length; j++) {
        let pokemonStatBaseStat = allFromApi[i]['stats'][j]['base_stat'];
        pokemonStatsValues.push(pokemonStatBaseStat);
    }
    return pokemonStatsValues;
}


function getPokemonSpeciesUrl(i) {
    return allFromApi[i]['species']['url'];
}

async function getPokemonAbout(i) {
    if (language.indexOf("De") == -1) {
        let about = await allFromApiSpecies[i]['flavor_text_entries'][10]['flavor_text'];
        return about;
    } else {
        let gerAbout = await allFromApiSpecies[i]['flavor_text_entries']
        for (let j = 0; j < await gerAbout.length; j++) {
            if (gerAbout[j].language.name == "de") {
                return await gerAbout[j]['flavor_text'];
            }
        }
    }
}


function getEvolutionChainID(allFromApiIndex) {
    let pokemonChainID = allFromApiSpecies[allFromApiIndex].evolution_chain.url;
    pokemonChainID = pokemonChainID.slice(41).replace("/", "").replace("/", "");
}

async function getGermanNames() {
    for (let i = 0; i < allFromApiSpecies.length; i++) {
        for (let j = 0; j < allFromApiSpecies[i].names.length; j++) {
            if (allFromApiSpecies[i].names[j].language.name == "de") {
                nameEn = allFromApiSpecies[i].name;
                allGermanPokemonNames.push({ "name-en": nameEn, "name-de": allFromApiSpecies[i].names[j].name });
            }
        }
    }
}

async function getEnglishNames(name) {
    for (j = 0; j < allGermanPokemonNames.length; j++) {
        if (allGermanPokemonNames.indexOf(`${name}` > 0)) {
            return allGermanPokemonNames[j].name - en;
        }
    }
}

function baseFormTranslate(baseForm) {
    for (let i = 0; i < allGermanPokemonNames.length; i++) {
        if (allGermanPokemonNames[i]['name-en'] === baseForm)
            return allGermanPokemonNames[i]['name-de'];
    }
}


function firstFormTranslate(firstEvolve) {
    for (let i = 0; i < allGermanPokemonNames.length; i++) {
        if (allGermanPokemonNames[i]['name-en'] === firstEvolve) {
            return allGermanPokemonNames[i]['name-de'];
        }
    }
}


function secondFormTranslate(secondEvolve) {
    for (let i = 0; i < allGermanPokemonNames.length; i++) {
        if (allGermanPokemonNames[i]['name-en'] === secondEvolve) {
            return allGermanPokemonNames[i]['name-de'];
        }
    }
}


function getEvolvesImages(name) {
    for (let j = 0; j < allFromApi.length; j++) {
        if (allFromApi[j].name.includes(`${name}`)) {
            if (!!allFromApi[j]['sprites']['front_shiny']) {
                return allFromApi[j]['sprites']['front_shiny'];
            }
        }

    }
}


async function getFailedEvolvesImages(name) {
    if (language.indexOf("De") == -1) {
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`
        let response = await fetch(url);
        let responseAsJS = await response.json();
        return await responseAsJS['sprites']['front_shiny'];

    } else {//Deutsch
        name = await getEnglishNames(name);
        let url = `https://pokeapi.co/api/v2/pokemon/${name}`
        let response = await fetch(url);
        let responseAsJS = await response.json();
        return await responseAsJS['sprites']['front_shiny'];

    }
}


async function fetchFailedPokemons(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    let responseAsJs = await response.json();
    let id = await responseAsJs['id'];
    let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
    failedEvolves.push([{ "secondEvolve": img }]);

}

async function getLikedImg(i) {
    if (allPokemonDetails[i].Liked === "unliked") {
        document.getElementById(`liked-${allPokemonDetails[i].name}`).src = "img/favorite-3-16.png";
    } else {
        document.getElementById(`liked-${allPokemonDetails[i].name}`).src = "img/favorite-2-16.png";
    }
}


async function countLoadedPokemons(i, j, x) {
    if (i < limit && document.getElementById("loadCountPokemons") !== null) {
        document.getElementById('loadCountPokemons').innerHTML = `<span class="d-flex">Loaded ${await i} from ${(limit - 3)} Pokemons</span>`;
    } if (j < limit && document.getElementById("loadCountPokemons") !== null) {
        document.getElementById('loadCountPokemons').innerHTML += `<span class="d-flex"> get ${await j}  from ${(limit - 3)} Species</span>`;
        if (x < limit && document.getElementById("loadCountPokemons") !== null) {
            document.getElementById('loadCountPokemons').innerHTML += `<span class="d-flex"> get ${x} from ${(limit - 3)}  Chain informations </span>`;

        }
    }
}

function loadScreen(count) {

    let load_screen = document.getElementById("load_screen");
    if (count === 0) {
        load_screen.classList.remove("d-none");
    }else{
        load_screen.classList.add("d-none");
    }
};

function countdown() {
    timerStartSec = 3;
    let timer = setInterval(function () {
        document.getElementById("timer").innerHTML = `${timerStartSec} Seconds.`;
        timerStartSec--;
        if (timerStartSec == 2) {
            document.getElementById("timer").innerHTML = `${timerStartSec} Seconds..`;
        }
        if (timerStartSec == 1) {
            document.getElementById("timer").innerHTML = `${timerStartSec} Seconds...`;
        }
        if (timerStartSec == 0) {
            clearInterval(timer);
        }
    }
        , 800);
}

async function setLiked(i) {
    like = document.getElementById(`liked-${allPokemonDetails[i].name}`);
    if (allPokemonDetails[i].Liked === "unliked") {
        allPokemonDetails[i].Liked = "liked";
        getLikedImg(i);
        let audio = new Audio(`./sounds/kanto/${allPokemonDetails[i].ID}.wav`)
        audio.play();

    } else {
        allPokemonDetails[i].Liked = "unliked";
        getLikedImg(i);
    }
}


function translateTxtCard() {

    document.getElementById('txt-about').innerHTML = "Über:"
}


async function getGermanTypes(url) {
    let typeUrl = url;
    response = await fetch(typeUrl);
    responseAsJs = await response.json();
    for (let i = 0; i < responseAsJs.names.length; i++) {
        if (responseAsJs.names[i].language.name == "de") {
            return responseAsJs.names[i].name;
        }
    }
}


function playAudio(i) {
    let audio = new Audio(`./sounds/kanto/${allPokemonDetails[i].ID}.wav`)
    audio.play();

}

async function setLikedOnRenderLikedPage(i) {
    like = document.getElementById(`liked-${allPokemonDetails[i].name}`);
    if (allPokemonDetails[i].Liked === "unliked") {
        allPokemonDetails[i].Liked = "liked";
        getLikedImg(i);
        renderLikedPokemons();
    } else {
        allPokemonDetails[i].Liked = "unliked";
        getLikedImg(i);
        renderLikedPokemons();
    }
}

function setUpperCase(pokemon) {
    return pokemon = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
}

async function loadSearch() {
    if (allPokemonDetails.length > 0) {
        let input = document.getElementById('search').value.toLowerCase();
        let list = document.getElementById('pokemonCards');
        list.innerHTML = "";
        let count = 0;
        search(input, list, count);
    } else {
        document.getElementById('search').value = "";
        document.getElementById('search').classList.add("input-failure");
        document.getElementById('search').placeholder = "Load Pokemons first"
    }
}

function search(input, list, count) {
    for (let i = 0; i < allPokemonDetails.length; i++) {
        if (allPokemonDetails[i].name.toLowerCase().includes(input) == false) {
            count++
        }
        if (allPokemonDetails[i].name.toLowerCase().includes(input)) {
            list.innerHTML += templateRenderPokemonCards(i);
            renderPokemonTypes(i);
            getLikedImg(i);
        }
    } if (count >= allPokemonDetails.length) {
        list.innerHTML = templateRenderSearchFailed();
    }
}

function loadMorePokemons() {
    window.location.reload();
}


function validInputOverSize(inputValue) {
    if (inputValue > 1154) {
        validInputOverSizeGt();
    }
    else if (inputValue < 1) {
        validInputOverSizeLt(inputValue);
    }
    else {
        validInputOverSizeElse(inputValue);
    }
}


function validInputOverSizeGt(inputValue) {
    renderUserInputForm();
    document.getElementById('pokemon-value').classList.add("input-failure");
    document.getElementById('pokemon-value').placeholder = "Sorry more then 1154 Pokemons not in the PokeDex!";
}

function validInputOverSizeLt(inputValue) {
    inputValue = "";
    renderUserInputForm();
    document.getElementById('pokemon-value').classList.add("input-failure");
    document.getElementById('pokemon-value').placeholder = "Sorry i cant display nothing!";
}

function validInputOverSizeElse(inputValue) {
    document.getElementById('load_screen').classList.remove("d-none");
    limit = inputValue;
    form.classList.add("d-none");
    loadPokemons();

}


function checkInputLoadValue() {

    let input = document.getElementById('pokemon-value').value;
    if (language.indexOf("De") == -1) {
        if (input > 100 && inputCounter == 0) {
            alert("Load more than 100 pokemons can take a while!")
            inputCounter = 1;
        }
    } else {
        if (input > 100 && inputCounter == 0) {
            alert("Mehr als 100 Pokemon zu laden kann etwas dauern!")
            inputCounter = 1;
        }
    }
}


function getInputPokemonValue() {
    form = document.getElementById('input-container');
    let inputValue = +document.getElementById('pokemon-value').value;
    validInputOverSize(inputValue);
}

function playAudioPik() {
    let audio = new Audio(`./sounds/kanto/25.wav`)
    audio.play();
}


function loadScreenMore() {
    document.getElementById("loadScreenMore").classList.remove("d-none");
}


function translateIt(index) {
    if (index == 1) {
        language.push("De");
        renderUserInputForm();
        translateItDoms();

    } else {
        language.pop();
        renderUserInputForm();
        document.getElementById('english-selected').innerHTML = "Language: English."
        return false;
    }
}

function translateItDoms() {
    document.getElementById('german-selectedselected').innerHTML = "Deutsch ausgewählt"
    document.getElementById('more-pokemons').innerHTML = "Mehr Pokemons";
    document.getElementById('link-favorites').innerHTML = "Favoriten";
    document.getElementById('laws').innerHTML = "Gesetzliches";
    document.getElementById('search-btn').innerHTML = "Suchen";
    document.getElementById('search').placeholder = "Suchen..."
}
