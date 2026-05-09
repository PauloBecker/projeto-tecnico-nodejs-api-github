// O QUE O .find FAZ
// Vou te retornar o primeiro valor que atenda a condição. 
function nossoFind(lista, funcaoCondicao) {
    for (let index = 0; index < lista.length; index++) {
        const element = lista[index];
        if (funcaoCondicao(element)) {
            return element;
        }
    }
    return undefined;
}

console.log(nossoFind(["banana", "maçã", "uva", "abacaxi", "laranja", "manga", "maracujá"], x => x.length > 6));
console.log(nossoFind([1, 81, 3, 4, 99, 6, 45], x => x > 4));
