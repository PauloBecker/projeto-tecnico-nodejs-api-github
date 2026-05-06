const readlinePromises = require('node:readline/promises');
const { stdin, stdout  } = require("process");

async function main() {

    const terminalWindow = readlinePromises.createInterface( stdin, stdout );
    
    const nome = await terminalWindow.question("What is your user github? ");
   
    const response = await fetch(`https://api.github.com/users/${nome}`)
    const json = await response.json();
    //console.log(`Your GitHub profile: ${json().html_url}`);
    console.log(json);
    
    terminalWindow.close();

};

main();