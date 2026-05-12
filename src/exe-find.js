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

console.log(nossoFind(
    ["banana", "maçã", "uva", "abacaxi", "laranja", "manga", "maracujá"], 
    x => x.length > 6));
    
console.log(nossoFind([1, 81, 3, 4, 99, 6, 45], x => x > 4));


//======================================================================
//Exercício: Quem está online? CodeWars
const whosOnline = (friends) => {
  if (friends.length === 0) return {}; // caso especial: nenhum amigo

  // já inicializa todas as propriedades como arrays vazios
  const resultado = {
    online: [],
    offline: [],
    away: []
  };

  for (let i = 0; i < friends.length; i++) {
    const user = friends[i];

    if (user.status === "offline") {
      resultado.offline.push(user.username);
    } else if (user.status === "online") {
      if (user.lastActivity > 10) {
        resultado.away.push(user.username);
      } else {
        resultado.online.push(user.username);
      }
    }
  }

  // remove propriedades vazias antes de retornar
  if (resultado.online.length === 0) delete resultado.online;
  if (resultado.offline.length === 0) delete resultado.offline;
  if (resultado.away.length === 0) delete resultado.away;

  return resultado;
};

console.log(whosOnline([
    { username: "David", status: "online", lastActivity: 10 },
    { username: "Lucy", status: "offline", lastActivity: 22 },
    { username: "Bob", status: "online", lastActivity: 104 },
  ]));