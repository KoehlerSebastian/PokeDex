async function renderPokemonCards(limit) {
    if(allFromApi.length === 0){
        loadMorePokemons();
    }else if (language.indexOf("De") == -1) {
        let pokemonCards = document.getElementById('pokemonCards');
        pokemonCards.innerHTML = "";
        for (let i = 0; i < limit; i++) {
            pokemonCards.innerHTML += templateRenderPokemonCards(i);
            renderPokemonTypes(i);
            getLikedImg(i);
        }
        templateRenderPokemonCardsLoadMoreEn();
    } else {
        let pokemonCards = document.getElementById('pokemonCards');
        pokemonCards.innerHTML = "";
        for (let i = 0; i < limit; i++) {
            pokemonCards.innerHTML += templateRenderPokemonCards(i);
            renderPokemonTypes(i);
            getLikedImg(i)
        }
        templateRenderPokemonCardsLoadMoreDe();
    }
}


function renderModalImpressum() {
    document.getElementById('modal-headline-name').innerHTML = `<h1>Impressum</h1>`
    document.getElementById('modal-portrait-img').src = "./img/searchFailed.png";
    document.getElementById('modal-links').innerHTML = "";
    document.getElementById('modal-body').innerHTML = templateRenderModalImpressum();
    document.getElementById('modal-footer').innerHTML = "";
}



async function renderModalEvolutions(i) {
    if (language.indexOf("De") == -1) {
        for (let j = 0; j < allPokemonDetails[i].Evolutions.length; j++) {
            if (allPokemonDetails[i].Evolutions[j]['baseForm'] && allPokemonDetails[i].Evolutions[j].baseFormImg) {
                await templateRenderModalEvolutionBaseForm(i, j);
            } if (allPokemonDetails[i].Evolutions[j]['baseForm'] && allPokemonDetails[i].Evolutions[j].baseFormImg == undefined) {
                await templateRenderModalEvolutionBaseFormFailed(i, j);
            }
            if (allPokemonDetails[i].Evolutions[j]['firstEvole'] && allPokemonDetails[i].Evolutions[j].firstEvolveImg) {
                await templateRenderModalEvolutionFirstEvolve(i, j);
            } if (allPokemonDetails[i].Evolutions[j]['firstEvole'] && allPokemonDetails[i].Evolutions[j]['firstEvolveImg'] == undefined) {
                await templateRenderModalEvolutionFirstEvolveFailed(i, j);
            }
            if (allPokemonDetails[i].Evolutions[j]['secondEvolve'] && allPokemonDetails[i].Evolutions[j]['secondEvolveImg']) {
                await templateRenderModalEvolutionSecondEvolve(i, j);
            } if (allPokemonDetails[i].Evolutions[j]['secondEvolve'] && allPokemonDetails[i].Evolutions[j]['secondEvolveImg'] == undefined) {
                await templateRenderModalEvolutionSecondEvolveFailed(i, j);
            }
        }
    } else {
        for (let j = 0; j < allPokemonDetails[i].Evolutions.length; j++) {

            if (allPokemonDetails[i].Evolutions[j]['baseForm'] && allPokemonDetails[i].Evolutions[j].baseFormImg) {
                await templateRenderModalEvolutionBaseForm(i, j);
            } if (allPokemonDetails[i].Evolutions[j]['baseForm'] && allPokemonDetails[i].Evolutions[j].baseFormImg == undefined) {
                await templateRenderModalEvolutionBaseFormFailed(i, j);
            }
            if (allPokemonDetails[i].Evolutions[j]['firstEvole'] && allPokemonDetails[i].Evolutions[j].firstEvolveImg) {
                await templateRenderModalEvolutionFirstEvolve(i, j);
            } if (allPokemonDetails[i].Evolutions[j]['firstEvole'] && allPokemonDetails[i].Evolutions[j]['firstEvolveImg'] == undefined) {
                await templateRenderModalEvolutionFirstEvolveFailed(i, j);
            }
            if (allPokemonDetails[i].Evolutions[j]['secondEvolve'] && allPokemonDetails[i].Evolutions[j]['secondEvolveImg']) {
                await templateRenderModalEvolutionSecondEvolve(i, j);
            } if (allPokemonDetails[i].Evolutions[j]['secondEvolve'] && allPokemonDetails[i].Evolutions[j]['secondEvolveImg'] == undefined) {
                await templateRenderModalEvolutionSecondEvolveFailed(i, j);
            }
        }
    }
}


async function renderModalBaseStats(i) {
    if (language.indexOf("De") == -1) {
        if (counterStats == 0) {
            counterStats = 1;
            templateModalBaseStatsEn();
            for (let j = 0; j < allPokemonDetails[i].stats[0].name.length; j++) {
                let name = allPokemonDetails[i].stats[0].name[j];
                let value = allPokemonDetails[i].stats[0]['base_stat'][j];
                document.getElementById('modal-stats').innerHTML += await templateRenderModalBaseStatsEn(name, i, j)
                let counts = 0;
                counts = setInterval(updated, 60);
                let upto = 0;
                let pixels = 0;
                function updated() {
                    let width = document.getElementById(`animation-${name}`);
                    let count = document.getElementById(`${name}`);
                    count.innerHTML = ++upto;
                    width.style.width = `${++pixels}px`
                    if (upto === value || counterStats === 0) {
                        clearInterval(counts);
                    }
                    if (upto === allPokemonDetails[i].stats[0]['base_stat'][4]) {
                        counterStats = 0;
                    }
                }
            } 0
        }
    } else {
        if (counterStats == 0) {
            counterStats = 1;
            templateModalBasteStatsDe();
            for (let j = 0; j < allPokemonDetails[i].stats[0].name.length; j++) {
                let name = allPokemonDetails[i].stats[0].name[j];
                let value = allPokemonDetails[i].stats[0]['base_stat'][j];
                document.getElementById('modal-stats').innerHTML += await templateRenderModalBaseStatsDe(name, i, j);
                let counts = 0;
                counts = setInterval(updated, 60);
                let upto = 0;
                let pixels = 0;
                function updated() {
                    let width = document.getElementById(`animation-${name}`);
                    let count = document.getElementById(`${name}`);
                    count.innerHTML = ++upto;
                    width.style.width = `${++pixels}px`
                    if (upto === value) {
                        clearInterval(counts);
                    }
                    if (upto === allPokemonDetails[i].stats[0]['base_stat'][4]) {
                        counterStats = 0;
                    }
                }
            } 0
        }
        await templateRenderBaseStatsGerman();
    }
}


function renderLikedPokemons() {
    if (allPokemons.length == 0) {
        templateRenderLikedPokemonNoFav();
    } else {
        let pokemonCards = document.getElementById('pokemonCards');
        pokemonCards.innerHTML = "";
        let count = 0;
        for (let i = 0; i < allPokemonDetails.length; i++) {
            if (allPokemonDetails[i].Liked === "liked") {
                count++;
                pokemonCards.innerHTML += templateRenderLikedPokemonCards(i);
                getLikedImg(i);
            }
            renderLikedPokemonTypes(i);
        } if (count == 0) {
            i = allPokemonDetails.length;
            templateRenderLikedPokemonsNothingEn();
            countdown();
            setTimeout(() => {
                renderPokemonCards(limit);
            }, 3000);
        }
    }
}



async function renderPokemonTypes(i) {
    document.getElementById(`type-${allPokemonDetails[i].name}`).innerHTML = "";
    for (j = 0; j < allPokemonDetails[i].types.length; j++) {
        let type = allPokemonDetails[i].types[j];
        document.getElementById(`type-${allPokemonDetails[i].name}`).innerHTML += /*html*/`
        <span class="type-${type} d-flex ms-1 pe-3 ps-3 me-1"> ${setUpperCase(type)} </span>`

    }
};



async function renderLikedPokemonTypes(i) {
    for (j = 0; j < allPokemonDetails[i].types.length; j++) {
        if (allPokemonDetails[i].Liked === "liked") {
            let type = allPokemonDetails[i].types[j];
            document.getElementById(`type-${allPokemonDetails[i].name}`).innerHTML += /*html*/`
            <span class="type-${type} d-flex ms-1 pe-3 ps-3 me-1"> ${setUpperCase(type)} </span>`
        } else { return false }
    }
}


function renderModalPokemonTpes(i) {
    document.getElementById(`modal-type`).innerHTML = "";
    for (j = 0; j < allPokemonDetails[i].types.length; j++) {
        let type = allPokemonDetails[i].types[j];
        document.getElementById(`modal-type`).innerHTML += /*html*/`
        <span class="type-${type} d-flex pe-3 ps-3 me-1 rounded-1"> ${setUpperCase(type)} </span>`;
    }
}

function renderModal(i) {
    if (counterStats === 0) {
        templateRenderPokemonModal(i);
        renderModalPokemonTpes(i);
        renderModalEvolutions(i);
    } else {
        alert("Click again if stats Loading is finished!");
    }

}

function renderUserInputForm() {
    let form = document.getElementById('input-container');
    if (language.indexOf("De") == -1) {
        if (form.classList.contains("d-none")) {
            form.classList.remove("d-none");
        } else { document.getElementById('load_screen').classList.add("d-none"); }
        form.innerHTML = templateRenderUserInputFormEn();
    } else {
        if (form.classList.contains("d-none")) {
            form.classList.remove("d-none");
        } else {
            document.getElementById('load_screen').classList.add("d-none");
        }
        form.innerHTML = templateRenderUserInputFormDe();
    }
}
