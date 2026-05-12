
import{ stdin, stdout  } from "process";
import { createInterface } from 'node:readline/promises';
import { adicao } from './service/adicao.js';
import { subtracao } from './service/subtracao.js';
import { multiplicacao } from './service/multiplicacao.js';
import { divisao } from './service/divisao.js';

async function main() {
  const consoleInterface = createInterface({ input: stdin, output: stdout });

  const respostaOperacao = await consoleInterface.question(
    'Digite a operação:\n + para adição\n - para subtração\n * para multiplicação\n / para divisão\n ');
  const a = await consoleInterface.question('Digite o primeiro número:\n ');
  const b = await consoleInterface.question('Digite o segundo número:\n ');

  //1- Fazer a transformação de string para número
  const numA = parseFloat(a);
  const numB = parseFloat(b);
  //2- Criar as outras operações em outros arquivos e importar aqui
  //3- BÔNUS: Resolver o problemas do sonsole preso quando a aplicação dá erro

  switch (respostaOperacao) {
    case '+':
        console.log('Você escolheu adição');
        const respostaAdicao = adicao(numA, numB);
        console.log(`resposta da adição: ${respostaAdicao}`);
        break;
    case '-':
        console.log('Você escolheu subtração');
        const respostaSubtracao = subtracao(numA, numB);
        console.log(`resposta da subtração: ${respostaSubtracao}`);
        break;
    case '*':
        console.log('Você escolheu multiplicação');
        const respostaMultiplicacao = multiplicacao(numA, numB);
        console.log(`resposta da multiplicação: ${respostaMultiplicacao}`);
        break;
    case '/':
        console.log('Você escolheu divisão');
        if (numB === 0) {
          console.log('Erro: Divisão por zero não é permitida.');
          consoleInterface.close();
          return;
        }
        const respostaDivisao = divisao(numA, numB);
        console.log(`resposta da divisão: ${respostaDivisao}`);
        break;
    default:
        throw new Error('Não suportamos esta operação');
        break;
  }
  consoleInterface.close();
}

main().catch(error => {
  console.error('Ocorreu um erro:', error.message);
  process.exit(1);
});
