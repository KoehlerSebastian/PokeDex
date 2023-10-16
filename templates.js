async function templateRenderBaseStatsGerman(){
    document.getElementById('txt-hp').innerHTML = "Lebenspunkte";
    document.getElementById('txt-attack').innerHTML = "Angriff";
    document.getElementById('txt-defense').innerHTML = "Verteidigung";
    document.getElementById('txt-special-attack').innerHTML = "Spezial-Angriff";
    document.getElementById('txt-special-defense').innerHTML = "Spezial-Verteidigung";
    document.getElementById('txt-speed').innerHTML = "Geschwindigkeit";
}

function templateRenderModalImpressum() {
    return /*html*/`
        <h1>Impressum</h1>
        <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
        <p>Sebastian K&ouml;hler<br />
        Mauritius Str. 17<br />
        46509 Xanten</p>
        <h2>Kontakt</h2>
        <p>Telefon: 01749429305<br />
        E-Mail: projects@koehler-sebastian.de</p>
        <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p>
        <a href="https://www.freepnglogos.com/pics/pokemon-logo-png">Pokemon Logo from freepnglogos.com</a>
        <a href="https://www.flaticon.com/de/kostenlose-icons/pokemon" title="pokémon Icons">Pokémon Icons erstellt von Nikita Golubev - Flaticon</a>
        `
}



function templateRenderUserInputFormEn() {
    return /*html*/`
<div class="d-flex"><img class="logo mb-5" src="./img/pokemon-logo-png-1428.png"></div>

    <div class="input-group mb-3 d-flex align-items-center flex-column">
    <select onchange="if (this.selectedIndex) translateIt(value)"name="language" class="form-select" aria-label="Default select example">
    <option id="english-selected"selected>Language: English.</option>
    <option id="option-germany" value="1">Deutsch</option>
    <option id="option_english"value="2">English</option>
    </select>
        <span class="rounded-0 input-group-text" id="inputGroup-sizing-default how-many">How many Pokemon should be loaded?</span>
        <input oninput="checkInputLoadValue();" id="pokemon-value"type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" minlength="1" maxlength="1154" placeholder="How many Pokemons?...">
        <span class="rounded-0 input-group-text">From which ID or Pokemon should loading beginn?</span>
        <input id="pokemon-value-start"type="text" inputmode="numeric" class="pokemon-value form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" minlength="0" maxlength="1154" placeholder="Start ID? or Start from Pokemonname?" required>
        <button class="btn btn-primary rounded-1" id="valueSubmitButton" onclick="getInputPokemonValue()"type="submit">Load Pokemons</button>
    </div>

</form>
</button>
`
}


function templateRenderUserInputFormDe() {
    return /*html*/`
    <div class="d-flex"><img class="logo mb-5" src="./img/pokemon-logo-png-1428.png"></div>
 
        <div class="input-group mb-3 d-flex align-items-center flex-column">
        <select onchange="if (this.selectedIndex) translateIt(value)"name="language" class="form-select" aria-label="Default select example">
        <option id="german-selectedselected">Wähle deine Sprache</option>
        <option id="option-germany" value="1">Deutsch</option>
        <option id="option_english"value="2">English</option>
        </select>
            <span class="rounded-0 input-group-text" id="inputGroup-sizing-default">Wie viele Pokemons sollen geladen werden ?</span>
            <input oninput="checkInputLoadValue()"id="pokemon-value"type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" minlength="1" maxlength="1154" placeholder="Wie viele Pokemons?..." required>
            <span class="rounded-0 input-group-text">Ab welcher ID soll das Laden begonnen werden?</span>
            <input id="pokemon-value-start"type="number" class="pokemon-value form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" minlength="0" maxlength="1154" placeholder="Start ID?...." required>
            <button class="btn btn-primary rounded-1" id="valueSubmitButton" onclick="getInputPokemonValue()"type="submit">Lade Pokemons</button>
        </div>

    </form>
    
    `;
}


async function templateRenderModalBaseStatsEn(pName, i, j){
    return /*html*/`
    <tr>
        <td id="txt-${pName}">${setUpperCase(allPokemonDetails[i].stats[0].name[j])}</td>
        <td id="${pName}">${allPokemonDetails[i].stats[0]['base_stat'][j]}</td>
        <div class="animation" id="animation-${pName}"></div>
    </tr>
</table>`
}

async function templateRenderModalBaseStatsDe(pName, i, j){
    return /*html*/`
    <tr>
        <td id="txt-${pName}">${setUpperCase(allPokemonDetails[i].stats[0].name[j])}</td>
        <td id="${pName}">${allPokemonDetails[i].stats[0]['base_stat'][j]}</td>
        <div class="animation" id="animation-${pName}"></div>
    </tr>
</table>`
}

function templateRenderPokemonCards(i) {
    if (language.indexOf("De") == -1) {
        return /*html*/`
    <div class="p-2 bg-transparent">
        <div class="card" style="width: 18rem;">
            <button onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="d-flex flex-grow-1 justify-content-end me-3">
                    <span class="pokemon-id">#${allPokemonDetails[i].ID}</span>
                </div>
                <img  class="pokemon-portrait card-img-top" src="${allPokemonDetails[i].Portrait}">
            </button>
            <div class="card-body d-flex justify-content-between">
                <button onclick="renderModal(${i})"class="button-at-liked btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <h5 class="card-title d-flex"><b>${setUpperCase(allPokemonDetails[i].name)}</b></h5>
                </button>
                    <img id="liked-${allPokemonDetails[i].name}" onclick="setLiked(${i})" class="stop favorite d-flex" src="">
            </div>
            <button onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <span class="d-flex justify-content-between">
                            <span class="d-flex me-3">
                                <b id="txt-type">Type:</b>
                            </span>
                            <span class="d-flex flex-grow-1 justify-content-end"id="type-${allPokemonDetails[i].name}">

                            </span>
                        </span>
                </li>
                </ul>
                <div class="max-height card-body ">
                    <span class="d-flex">
                        <span class="d-flex"><b id="txt-about">About:</b></span>
                        <span class="d-flex ms-3"><p>${allPokemonDetails[i].About}</p></span>
                    </span>
                </div>
            </button>
        </div>
    </div>
        `;

    } else {
        return /*html*/`
        <div class="p-2 bg-transparent">
        <div class="card" style="width: 18rem;">
            <button onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <div class="d-flex flex-grow-1 justify-content-end me-3">
                    <span class="pokemon-id">#${allPokemonDetails[i].ID}</span>
                </div>
                <img  class="pokemon-portrait card-img-top" src="${allPokemonDetails[i].Portrait}" loading="lazy">
            </button>
            <div class="card-body d-flex justify-content-between">
                <button onclick="renderModal(${i})"class="button-at-liked btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <h5 class="card-title d-flex"><b>${setUpperCase(allPokemonDetails[i].name)}</b></h5>
                </button>
                    <img id="liked-${allPokemonDetails[i].name}" onclick="setLiked(${i})" class="stop favorite d-flex" src="">
            </div>
            <button onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <span class="d-flex justify-content-between">
                            <span class="d-flex me-3">
                                <b id="txt-type">Typ:</b>
                            </span>
                            <span class="d-flex flex-grow-1 justify-content-end"id="type-${allPokemonDetails[i].name}">

                            </span>
                        </span>
                </li>
                </ul>
                <div class="max-height card-body ">
                    <span class="d-flex">
                        <span class="d-flex"><b id="txt-about">Über:</b></span>
                        <span class="d-flex ms-3"><p>${allPokemonDetails[i].About}</p></span>
                    </span>
                </div>
            </button>
        </div>
    </div>
        `;
    }
}


function templateRenderLikedPokemonCards(i) {
    if (language.indexOf("De") == -1) {
        return /*html*/`
        <div class="p-2 bg-transparent">
            <div class="card" style="width: 18rem;">
                <button id="btn-5-${i}"onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div class="d-flex flex-grow-1 justify-content-end me-3"><span class="pokemon-id">#${allPokemonDetails[i].ID}</span></div>
                        <img  class="pokemon-portrait" src="${allPokemonDetails[i].Portrait}" class="card-img-top" loading="lazy">
                </button>
                        <div class="card-body d-flex justify-content-between">
                        <button onclick="renderModal(${i})"class="button-at-liked btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <h5 class="card-title d-flex"><b>${setUpperCase(allPokemonDetails[i].name)}</b></h5>
                        </button>
                            <img id="liked-${allPokemonDetails[i].name}" onclick="setLikedOnRenderLikedPage(${i})" class="favorite d-flex" src="">
                        </div>
                        <button onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><span class="d-flex justify-content-between"><span class="d-flex me-3"><b>Type:</b></span><span class="d-flex flex-grow-1 justify-content-end"id="type-${allPokemonDetails[i].name}"></span></span></li>
                            </ul>
                            <div class="max-height card-body">
                                <span class="d-flex">
                                    <span class="d-flex"><b id="liked-txt-about">About:</b></span>
                                    <span class="d-flex ms-3">${allPokemonDetails[i].About}</span>
                        
                                </span>
                            </div>
                        </button>
                
            </div>
        </div>
        `;
    } else {
        return /*html*/`
        <div class="p-2 bg-transparent">
            <div class="card" style="width: 18rem;">
                <button id="btn-5-${i}"onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div class="d-flex flex-grow-1 justify-content-end me-3"><span class="pokemon-id">#${allPokemonDetails[i].ID}</span></div>
                        <img  class="pokemon-portrait" src="${allPokemonDetails[i].Portrait}" class="card-img-top" loading="lazy">
                </button>
                        <div class="card-body d-flex justify-content-between">
                        <button onclick="renderModal(${i})"class="button-at-liked btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <h5 class="card-title d-flex"><b>${setUpperCase(allPokemonDetails[i].name)}</b></h5>
                        </button>
                            <img id="liked-${allPokemonDetails[i].name}" onclick="setLikedOnRenderLikedPage(${i})" class="favorite d-flex" src="">
                        </div>
                        <button onclick="renderModal(${i})"class="btn-none bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"><span class="d-flex justify-content-between"><span class="d-flex me-3"><b>Typ:</b></span><span class="d-flex flex-grow-1 justify-content-end"id="type-${allPokemonDetails[i].name}"></span></span></li>
                            </ul>
                            <div class="max-height card-body">
                                <span class="d-flex">
                                    <span class="d-flex"><b id="liked-txt-about">Über:</b></span>
                                    <span class="d-flex ms-3">${allPokemonDetails[i].About}</span>
                        
                                </span>
                            </div>
                        </button>
                
            </div>
        </div>
        `;
    }
}



function templateRenderPokemonModal(i) {
    if (language.indexOf("De") == -1) {
        document.getElementById('modal-headline-name').innerHTML = `<h1>${setUpperCase(allPokemonDetails[i].name)}</h1>`
        document.getElementById('modal-portrait-img').src = allPokemonDetails[i].Portrait;
        document.getElementById('modal-links').innerHTML = /*html*/`
    <button onclick="renderModal(${i})" type="button" class="btn-width btn btn-info">About</button>
    <button onclick="renderModalBaseStats(${i})" type="button" class="ms-2 me-2 btn-width btn btn-info">Base Stats</button>
    <button onclick="playAudio(${i})" type="button" class="btn-width btn btn-info" style="width: 60px"><img class="icon" src="./img/audio-32.png" alt=""></button>
`
        document.getElementById('modal-body').innerHTML =/*html*/`
    <table>
        <tr>
            <td class="fw-bold">Name:</td>
            <td><span>${setUpperCase(allPokemonDetails[i].name)}</span></td>
        </tr>
        <tr>
            <td class="fw-bold">ID:</td>
            <td><span>#${allPokemonDetails[i].ID}</span></td>
        </tr>
        <tr>
            <td class="fw-bold">Type:</td>
            <td><span class="d-flex" id="modal-type"></span></td>
        </tr>
        <tr>
            <td class="fw-bold" id="txt-weight">Weight:</td>
            <td><span class="d-flex"></span>${(+allPokemonDetails[i].weight / 10).toFixed(2)} kg</td>
        </tr>
        <tr>
            <td class="fw-bold" id="txt-height">Height:</td>
            <td><span class="d-flex"></span>${(+allPokemonDetails[i].height / 10).toFixed(2)} m</td>
        </tr>


    </table> 
    `;
        document.getElementById('modal-footer').innerHTML = /*html*/`
               <div clasS="evolution-container"class="d-flex">
              <span class="d-flex me-2" id="txt-evoulutions">Evolutions:</span>
              <div class="d-flex justify-content-between evolutions" id="evolutions">
            </div>
    
    `;
    } else {
        document.getElementById('modal-headline-name').innerHTML = `<h1>${setUpperCase(allPokemonDetails[i].name)}</h1>`
        document.getElementById('modal-portrait-img').src = allPokemonDetails[i].Portrait;
        document.getElementById('modal-links').innerHTML = /*html*/`
    <button onclick="renderModal(${i})" type="button" class=" me-2 btn-width btn btn-info"  style="width: 100px">Über</button>
    <button onclick="renderModalBaseStats(${i})" type="button" class="me-2 btn-width btn btn-info" style="width: 100px">Basis Attribute</button>
    <button onclick="playAudio(${i})" type="button" class="btn-width btn btn-info" style="width: 60px"><img class="icon" src="./img/audio-32.png" alt=""></button>

`
        document.getElementById('modal-body').innerHTML =/*html*/`
    <table>
        <tr>
            <td class="fw-bold">Name:</td>
            <td><span>${setUpperCase(allPokemonDetails[i].name)}</span></td>
        </tr>
        <tr>
            <td class="fw-bold">ID:</td>
            <td><span>#${allPokemonDetails[i].ID}</span></td>
        </tr>
        <tr>
            <td class="fw-bold">Typ:</td>
            <td><span class="d-flex" id="modal-type"></span></td>
        </tr>
        <tr>
            <td class="fw-bold" id="txt-weight">Gewicht:</td>
            <td><span class="d-flex"></span>${(+allPokemonDetails[i].weight / 10).toFixed(2)} kg</td>
        </tr>
        <tr>
            <td class="fw-bold" id="txt-height">Größe:</td>
            <td><span class="d-flex"></span>${(+allPokemonDetails[i].height / 10).toFixed(2)} m</td>
        </tr>


    </table> 
    `;
        document.getElementById('modal-footer').innerHTML = /*html*/`
               <div clasS="evolution-container"class="d-flex">
              <span class="d-flex me-2 fw-bold" id="txt-evoulutions">Entwicklungen:</span>
              <div class="d-flex justify-content-between evolutions" id="evolutions">
            </div>
    
    `;


    }
}


function templateRenderSearchFailed(){
    return /*html*/`
     <div class="d-flex flex-column">
     <span class="d-flex color-white"><h4>Unfortunately no hits</h4></span><img src="./img/searchFailed.png"></div>`
 }
 


 function templateModalBasteStatsDe(){

    document.getElementById('modal-body').innerHTML = ""
    document.getElementById('modal-footer').innerHTML = ""
    document.getElementById('modal-body').innerHTML = /*html*/`
<div class="d-flex flex-column align-items-center"><table  id="modal-stats"></table></div>`
}

function templateModalBaseStatsEn(){
    document.getElementById('modal-body').innerHTML = ""
    document.getElementById('modal-footer').innerHTML = ""
    document.getElementById('modal-body').innerHTML = /*html*/`
        <div class="d-flex flex-column align-items-center"><table  id="modal-stats"></table></div>`
}


function templateRenderLikedPokemonsNothingEn(){
    pokemonCards.innerHTML = /*html*/`
    <div class="d-flex flex-column align-items-center">
    <div class="d-flex"><img class="logo mt-5" src="./img/pokemon-logo-png-1428.png"></div>
    <div class="flex-column no-favorites align-items-center d-flex justify-content-center"><h2>No selected favorites , please choose your Favorite Pokemon's</h2><h3>Automatic back to home in <span id="timer"> 3 Seconds. </span</h3></div>
    </div>`
}


function templateRenderLikedPokemonNoFav(){
    document.getElementById('link-favorites').addEventListener("click", () => {
        document.getElementById('pokemon-value').placeholder = "No Pokemons no Favorites!"
        document.getElementById('pokemon-value').classList.add("input-failure");
        document.getElementById('pokemon-value').focus();
    });
}


function templateRenderPokemonCardsLoadMoreEn(){
    pokemonCards.innerHTML += /*html*/`
    <button onclick="fetchMorePokemons();loadScreenMore();playAudioPik()"class="btn-none bg-transparent" type="button">
        <div class="p-2 bg-transparent d-flex align-items-center justify-content-center">
        <div class="card d-flex flex-column justify-content-center align-items-center" style="width: 18rem;min-height: 486px;">
        <img  class=" d-flex pokemon-portrait card-img-top" src="./img/searchFailed.png">
        <h5 class="card-title d-flex justify-content-center"><b>Load More Pokemons</b></h5>
        <img id="loadScreenMore" class="mt-3 icon bounce2 d-none"src="./img/pokeball.png" alt="">
</div>
</button>`;

}

function templateRenderPokemonCardsLoadMoreDe(){
    pokemonCards.innerHTML += /*html*/`
    <button onclick="fetchMorePokemons();loadScreenMore();playAudioPik()"class=" d-flex justify-content-center align-items-center btn-none bg-transparent" type="button"><div class=" d-flex p-2 bg-transparent justify-content-center align-items-center">
        <div class="card d-flex flex-column justify-content-center align-items-center" style="width: 18rem;min-height: 486px;">
            <img  class="d-flex pokemon-portrait card-img-top" src="./img/searchFailed.png">
            <h5 class="card-title d-flex justify-content-center"><b>Lade mehr Pokemons</b></h5>
            <img id="loadScreenMore" class="mt-3 icon bounce2 d-none"src="./img/pokeball.png" alt="">
        </div>
    </button>`
}



async function templateRenderModalEvolutionBaseForm(i, j){
    return  document.getElementById('evolutions').innerHTML += /*html*/`
    <div class="d-flex flex-column-reverse align-items-center">
    <div class="d-flex" id="modal-evolve-base-form"><b>${setUpperCase(allPokemonDetails[i].Evolutions[j]['baseForm'])}</b></div>
    <img class="d-flex" id="modal-evolve-base-form-img" src=${allPokemonDetails[i].Evolutions[j]['baseFormImg']}>
    </div>`;
}

async function templateRenderModalEvolutionBaseFormFailed(i, j){
    return document.getElementById('evolutions').innerHTML += /*html*/`
    <div class="d-flex flex-column-reverse align-items-center">
    <div class="d-flex" id="modal-evolve-base-form"><b>${setUpperCase(allPokemonDetails[i].Evolutions[j]['baseForm'])}</b></div>
    <img class="d-flex" id="modal-evolve-base-form-img" src=${await getFailedEvolvesImages(allPokemonDetails[i].Evolutions[j]['baseForm'])}>
    </div>`
}


async function templateRenderModalEvolutionFirstEvolve(i, j){
    return document.getElementById('evolutions').innerHTML += /*html*/`
    <div class="d-flex flex-column-reverse align-items-center">
    <div class="d-flex"  id="modal-evolve-first-form"><b>${setUpperCase(allPokemonDetails[i].Evolutions[j]['firstEvole'])}</b></div>
    <img class="d-flex"  id="modal-evolve-first-img" src=${allPokemonDetails[i].Evolutions[j]['firstEvolveImg']}>
    </div>`
}

async function templateRenderModalEvolutionFirstEvolveFailed(i, j){
    return document.getElementById('evolutions').innerHTML += /*html*/`
    <div class="d-flex flex-column-reverse align-items-center">
    <div class="d-flex" id="modal-evolve-first-form"><b>${setUpperCase(allPokemonDetails[i].Evolutions[j]['firstEvole'])}</b></div>
    <img class="d-flex" id="modal-evolve-first-form-img" src=${await getFailedEvolvesImages(allPokemonDetails[i].Evolutions[j]['firstEvole'])}>
    </div>`
}


async function templateRenderModalEvolutionSecondEvolve(i, j){
    return document.getElementById('evolutions').innerHTML += /*html*/`
    <div class="d-flex flex-column-reverse align-item-center">
    <div  class="d-flex" id="modal-evolve-second-form"><b>${setUpperCase(allPokemonDetails[i].Evolutions[j]['secondEvolve'])}</b></div>
    <img  class="d-flex" id="modal-evolve-second-form-img" src=${allPokemonDetails[i].Evolutions[j]['secondEvolveImg']}>
    </div>`
}


async function templateRenderModalEvolutionSecondEvolveFailed(i, j){
    return document.getElementById('evolutions').innerHTML += /*html*/`
    <div class="d-flex flex-column-reverse align-items-center">
    <div class="d-flex" id="modal-evolve-second-form"><b>${setUpperCase(allPokemonDetails[i].Evolutions[j]['secondEvolve'])}</b></div>
    <img class="d-flex" id="modal-evolve-second-form-img" src=${await getFailedEvolvesImages(allPokemonDetails[i].Evolutions[j]['secondEvolve'])}>
    </div>`
}