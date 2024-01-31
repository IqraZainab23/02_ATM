#!/usr/bin/env node
import inquirer from "inquirer";
import boxen from 'boxen';
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
async function Welcome() {
    let title = chalkAnimation.rainbow(boxen(`

    Welcome to our ATM!       
    .----------------------.
    |  [ 1 ] userID        |
    |  [ 2 ] userPIN       |
    |  [ 3 ] AccountType   |
    |  [ 4 ] transaction   |
    |  [ 5 ] amount        |
    '----------------------' 
    
    𝓓𝓸𝓷𝓮 𝓫𝔂 𝓘𝓺𝓻𝓪 𝓩𝓪𝓲𝓷𝓪𝓫 
    
    `, {
        title: 'ATM Machine Project',
        titleAlignment: 'center',
        borderStyle: "single",
        padding: 0,
    }));
    await new Promise((res) => {
        setTimeout(res, 2000);
    });
    title.stop();
}
await Welcome();
async function startATMConservation() {
    console.log("");
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "userid",
            message: chalk.blue("Kindly enter your user ID: ")
        },
        {
            type: "number",
            name: "userpin",
            message: chalk.blue("Kindly enter your user PIN: ")
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Current", "Saving"],
            message: chalk.blue("Select your AccountType: ")
        },
        {
            type: "list",
            name: "transactionType",
            choices: ["Fast Cash", "Withdraw"],
            message: chalk.blue("Select your transactionType: "),
            when(answers) {
                return answers.accountType;
            }
        },
        {
            type: "list",
            name: "amount",
            choices: ["1000", "2000", "5000", "10000", "20000"],
            message: chalk.green("Select your amount: "),
            when(answers) {
                return answers.transactionType === "Fast Cash";
            }
        },
        {
            type: "number",
            name: "amount",
            message: chalk.green("Enter your amount:"),
            when(answers) {
                return answers.transactionType === "Withdraw";
            }
        },
    ]);
    if (answers.userid && answers.userpin) {
        console.log(chalk.red("Processing your request..."));
        const balance = Math.floor(Math.random() * 1000000);
        console.log(chalk.magentaBright("Your current balance is: PKR", balance.toLocaleString()));
        const enteredamount = answers.amount;
        if (balance >= enteredamount) {
            const remainingbalance = balance - enteredamount;
            console.log(chalk.magentaBright("Transaction is successfull. Your remaining balance is: PKR", remainingbalance.toLocaleString()));
            remainingbalance.toLocaleString;
        }
        else {
            console.log(chalk.red("Insufficient Balance. Please try again with a lower amount."));
        }
    }
}
startATMConservation();
