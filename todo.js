import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.greenBright("Welcome to Shoaib Todo List!"));
const todos = [];
const todosD = [];
async function askQuestion() {
    await inquirer
        .prompt([
        /* Pass your questions in here */
        {
            type: "string",
            name: "todo",
            message: chalk.blueBright("Enter your Todo task here!"),
            validate: async (todo) => {
                if (todo == "") {
                    return chalk.blueBright("Please enter To-do task!");
                }
                return true;
            },
        },
        {
            type: "string",
            name: "deadline",
            message: chalk.greenBright(`Enter the deadline for above task here!`),
            validate: async (todo) => {
                if (todo == "") {
                    return chalk.greenBright("Please enter deadline for the task!");
                }
                return true;
            },
            when(answers) {
                return answers.todo;
            },
        }
    ])
        .then((answers) => {
        if (answers.todo && answers.deadline) {
            todos.push(answers.todo);
            todosD.push(answers.deadline);
        }
        else {
            console.log(chalk.blueBright("Write a to-do task!"));
        }
        if (todos.length > 0) {
            console.log(`Your Todo list contains: `);
            for (let i = 0; i < todos.length; i++) {
                console.log(chalk.blueBright(`Task: ${todos[i]}, Deadline: ${chalk.greenBright(todosD)}`));
            }
            // todos.forEach((x) => {console.log(x,"    -----------    ", )})
        }
        else if (todos.length == 0) {
            console.log(chalk.blueBright("Your Todo list is empty!"));
        }
    });
}
async function startagain() {
    let again;
    do {
        await askQuestion();
        again = await inquirer
            .prompt({
            type: "input",
            name: "restart",
            message: chalk.yellowBright("Do you want to continue adding more to-do tasks?"),
            default: "(Y or N)"
        });
    } while (again.restart == 'y' || again.restart == 'Y');
}
startagain();
