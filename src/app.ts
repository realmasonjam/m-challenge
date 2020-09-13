import { Company } from './Company'
import readline from 'readline';

const c: Company = new Company()
const promptmenu = '\nPlease choose one option: \n(1 to enter CEO) \n(2 to enter employee)\n(3 to see company hierarchy) \n(4 to exit) \n> '
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: promptmenu
});

rl.prompt();
let statePrompt = 0
rl.on('line', (line) => {
  switch (line.trim()) {
    case '1':
      statePrompt = 1
      rl.setPrompt('\nPlease Enter the CEO name (Id, CEO name)>')
      rl.prompt();
      break;
    case '2':
      statePrompt = 2
      rl.setPrompt('\nPlease Enter the Employee name (Id, Employee name, Manager Id)>')
      rl.prompt();
      break;
    case '3':
      statePrompt = 3
      c.printHierarchy()
      rl.prompt();
      break;
    case '4':
      console.log('Have a great day!');
      process.exit(0);
    default:
      switch (statePrompt) {
        case 0:
          rl.prompt();
          break
        case 1:
          try {
            const ceo = line.split(',').map((item) => item.trim())
            c.addCeo(ceo[0], ceo[1])
            console.log('CEO added.')
          } catch (error) {
            console.log(error)
          }
          rl.setPrompt(promptmenu)
          rl.prompt();
          break
        case 2:
          try {
            const employee = line.split(',').map((item) => item.trim())
            c.addEmployee(employee[0], employee[1], employee[2])
            console.log('Employee added.')
          } catch (error) {
            console.log(error)
          }
          rl.setPrompt(promptmenu)
          rl.prompt();
          break
      }
      break;
  }
}).on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});
