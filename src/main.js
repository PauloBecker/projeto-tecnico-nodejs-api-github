
import { iniciarCalculadora } from './controller/iniciarCalculadora.js';

iniciarCalculadora().catch(error => {
  console.error('Ocorreu um erro:', error.message);
  process.exit(1);
});
