import { stdin, stdout } from "process"; //standardIn E standardOut -> entrada padrão e saída padrão
import { createInterface } from "node:readline/promises";
import { writeFile, readFile } from "node:fs/promises"; // file-system

// O programa deve pedir um usuário
// Caso o usuário Não exista, ou a requisição de busca falhe, o programa deve tratar os erros corretamente e mostrar ao usuário a mensagem adequada
// Se o usuário for encontrado, deve ser mostrado na tela (terminal), o nome e o username
// Perguntar ao usuário se deseja salvar
// Não poderá salvar usuários repetidos
// Não deverá sobrescrever usuários já existentes

async function buscarUsuario(username) {
    const urlBase = `https://api.github.com/users/`;

    try {
        const response = await fetch(`${urlBase}${username}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Usuário ${username} não encontrado no GitHub.`);
            }
            throw new Error(`Erro na API do GitHub (Status: ${response.status})`);
        }

        const body = await response.json();
        return body;

    } catch (error) {
        // Lança o erro para ser capturado de forma centralizada no main()
        console.error('Erro ao buscar usuário:', error.message);
        throw error;
        
    }
}

// 2. Leitura com fallback seguro se o arquivo não existir
async function lerArquivo() {
  try {
    const usuariosText = await readFile("./database.json", {
      encoding: "utf-8",
    });

    // Garante que se o texto for nulo ou vazio, retorna um array limpo
    if (!usuariosText.trim()) return [];

    return JSON.parse(usuariosText);

  } catch (error) {
    // Se o arquivo não existir (ENOENT), retorna um array vazio para iniciar o banco
        if (error.code === 'ENOENT') {
            return [];
        }
        console.error("Arquivo corrompido, inicializando base vazia.");
        return [];
  }
}

// 3. Salvamento e validação de duplicados pelo 'id' do GitHub
async function salvarUsuario(usuario) {
    // PROTEÇÃO 1: Impede a leitura de 'id' se o objeto do usuário veio nulo ou inválido
    if (!usuario || !usuario.id) {
        console.error("Erro: Dados do usuário inválidos para salvamento.");
        return;
    }

    // Garante que 'usuarios' seja sempre um array, mesmo que a leitura falhe ou retorne nulo   
    const usuarios = await lerArquivo() || []; 

    // Impede a duplicidade checando se o ID único do GitHub já existe no arquivo
    const usuarioJaExiste = usuarios.some(u => u.id === usuario.id);
    
    if(usuarioJaExiste){
        console.log(`O usuário "${usuario.login}" já está salvo no arquivo.`);
        return;
    }

    usuarios.push(usuario)

     await writeFile(`./database.json`, JSON.stringify(usuarios,null,2), {
       encoding: "utf-8",
     });
     console.log('Usuário salvo com sucesso!');
}



async function main() {
  const interfaceConsole = createInterface(stdin, stdout);

    console.log("=== Bem-vindo ao buscador de usuários do GitHub ===");
    
    try {
        const recebeUsuario = await interfaceConsole.question(
        "Digite o usuário:\n", // \n - Quebra de linha
      );
       //Trim -> Remove espaços extras (brancos) nas pontas digitados pelo usuário
        const usernameLimpo = recebeUsuario.trim(); 

        console.log("Buscando dados...");
        const usuario = await buscarUsuario(usernameLimpo);

         // Exibe o Nome e o Username (login) na tela
        console.log("\n--- Usuário Encontrado ---");
        console.log(`Nome: ${usuario.name || "Não informado"}`);
        console.log(`Username: ${usuario.login}`);
        console.log(`ID: ${usuario.id}`);
        console.log("--------------------------\n");

        // Pergunta se deseja salvar
        const desejaSalvar = await interfaceConsole.question("Deseja salvar este usuário? (sim/nao): ");

        if (desejaSalvar.toLowerCase() === 'sim' || desejaSalvar.toLowerCase() === 's') {
            await salvarUsuario(usuario);
        } else {
            console.log("Operação cancelada. O usuário não foi salvo.");
        }

    } catch (error) {

  // Tratamento centralizado de erros: amigável para o usuário final
        console.error(`Ops! ${error.message}`);
    } finally {
  
        interfaceConsole.close();
    }
}

main().catch(console.log);
