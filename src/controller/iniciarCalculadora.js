import{ stdin, stdout  } from "process";
import { createInterface } from 'node:readline/promises';
import { adicao } from '../service/adicao.js';
import { subtracao } from '../service/subtracao.js';
import { multiplicacao } from '../service/multiplicacao.js';
import { divisao } from '../service/divisao.js';

export async function iniciarCalculadora() {
  const consoleInterface = createInterface({ input: stdin, output: stdout });

  let respostaOperacao;

  do {
   respostaOperacao = await consoleInterface.question(
    'Digite a operação:\n\n ➕ para adição\n ➖ para subtração\n ✖️  para multiplicação\n ➗ para divisão\n ⭕ para sair do sistema\n');
  
    respostaOperacao = respostaOperacao.toLowerCase();

    if(respostaOperacao === '0') {
        console.log('Você escolheu sair do sistema ⭕');
        console.log(`Encerrando a aplicação... Até mais! 🖖🫡`);
      break;
    }
    const a = await consoleInterface.question('Digite o primeiro número:\n ');
    const b = await consoleInterface.question('Digite o segundo número:\n ');
    
    //1- Fazer a transformação de string para número
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    //2- Criar as outras operações em outros arquivos e importar aqui
    //3- BÔNUS: Resolver o problemas do sonsole preso quando a aplicação dá erro
    
    
    switch (respostaOperacao) {
    case '+':
        console.log('Você escolheu adição ➕');
        const respostaAdicao = adicao(numA, numB);
        console.log(`\nResposta da soma de ${numA} + ${numB} = ${respostaAdicao}\n`);
        break;
    case '-':
        console.log('Você escolheu subtração ➖');
        const respostaSubtracao = subtracao(numA, numB);
        console.log(`\nResposta da subtração de ${numA} - ${numB} = ${respostaSubtracao}\n`);
        break;
    case '*':
        console.log('Você escolheu multiplicação ✖️');
        const respostaMultiplicacao = multiplicacao(numA, numB);
        console.log(`\nResposta da multiplicação de ${numA} * ${numB} = ${respostaMultiplicacao}\n`);
        break;
    case '/':
        console.log('Você escolheu divisão ➗');
        if (numB === 0) {
          console.log('❌ Erro: Divisão por zero não é permitida 🚨.');
          consoleInterface.close();
          return;
        }
        const respostaDivisao = divisao(numA, numB);
        console.log(`\nResposta da divisão de ${numA} / ${numB} = ${respostaDivisao}\n`);
        break;
    case '0':
        console.log('Você escolheu sair do sistema ⭕');
        console.log(`\n Encerrando a aplicação... Até mais! 🖖🫡`);
        break;
    default:
        throw new Error('❌ 🚨 Não suportamos esta operação');
        break;
      }   
  }while (respostaOperacao !== '0'); 
  consoleInterface.close();
}