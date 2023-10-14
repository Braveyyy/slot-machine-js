/* 
    Steps:
    Deposit Money
    Determine lines to bet on
    Collect bet amount
    Spin machine
    Check if won
    If won, give user winnings
    If lost, take their bet
    Play again ?
*/

const prompt = require("prompt-sync")();

const depositMoney = () => {
    while(true)
    {
        const input = prompt("Please enter how much you would like to deposit: ");
        const depositAmount = parseFloat(input);
    
        if(isNaN(depositAmount) || depositAmount <= 0)
        {
            console.log("Invalid deposit, try again.");
        }
        else
        {
            return depositAmount;
        }
    }
}

depositMoney();