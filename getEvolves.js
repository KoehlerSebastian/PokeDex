function getEvolves(i) {
    if (language.indexOf("De") == -1) {
        if (allFromApiChain[i] && allFromApiChain[i]['chain']['evolves_to'].length > 0 && allFromApiChain[i]['chain']['evolves_to'][0]['species']) {
            let baseForm = allFromApiChain[i]['chain']['species'].name;
            let firstEvolve = allFromApiChain[i]['chain']['evolves_to'][0]['species'].name;
            let baseFormImg = getEvolvesImages(baseForm);
            let firstEvolveImage = getEvolvesImages(firstEvolve);
            if (allFromApiChain[i]['chain']['evolves_to'][0]['evolves_to'][0]) {
                let secondEvolve = allFromApiChain[i]['chain']['evolves_to'][0]['evolves_to'][0]['species'].name;
                let secondEvolveImage = getEvolvesImages(secondEvolve);
                return [{ "baseForm": baseForm, "baseFormImg": baseFormImg }, { "firstEvole": firstEvolve, "firstEvolveImg": firstEvolveImage }, { "secondEvolve": secondEvolve, "secondEvolveImg": secondEvolveImage }]
            } else { return [{ "baseForm": baseForm, "baseFormImg": baseFormImg }, { "firstEvole": firstEvolve, "firstEvolveImg": firstEvolveImage }] }
        } else {
            return null;
        }
    } else if (language.indexOf("De") > -1) {
        if (allFromApiChain[i]['chain']['evolves_to'].length > 0 && allFromApiChain[i]['chain']['evolves_to'][0]['species']) {
            console.log("IF get Evolves German");
            let baseForm = allFromApiChain[i]['chain']['species'].name;
            let baseFormGerman = baseFormTranslate(baseForm);
            let firstEvolve = allFromApiChain[i]['chain']['evolves_to'][0]['species'].name;
            let firstEvolveGerman = firstFormTranslate(firstEvolve);
            console.log(firstEvolveGerman);
            let baseFormImg = getEvolvesImages(allFromApiChain[i]['chain']['species'].name);
            let firstEvolveImage = getEvolvesImages(firstEvolve);
            
            if (allFromApiChain[i]['chain']['evolves_to'][0]['evolves_to'][0]) {
                console.log("IF2 get Evolves German");
                let secondEvolve = allFromApiChain[i]['chain']['evolves_to'][0]['evolves_to'][0]['species'].name;
                let secondEvolveGerman = secondFormTranslate(secondEvolve);
                let secondEvolveImage = getEvolvesImages(secondEvolve);
                return [{ "baseForm": baseFormGerman, "baseFormImg": baseFormImg }, { "firstEvole": firstEvolveGerman, "firstEvolveImg": firstEvolveImage }, { "secondEvolve": secondEvolveGerman, "secondEvolveImg": secondEvolveImage }]
            } else { return [{ "baseForm": baseFormGerman, "baseFormImg": baseFormImg }, { "firstEvole": firstEvolveGerman, "firstEvolveImg": firstEvolveImage }] }
        } else {
            console.log(i, "null get evolves");
            return null;
        }
    }
}





//RENDER

