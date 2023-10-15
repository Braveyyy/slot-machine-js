
//const prompt = require("prompt-sync")();
import promptSync from 'prompt-sync';
//import { setTimeout } from "timers/promises";
const prompt = promptSync();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}


// Gets deposit input from user and returns the amount
const depositMoney = () => {
    while(true)
    {
        const inputDepo = prompt("Please enter how much you would like to deposit: ");
        const depositAmount = parseFloat(inputDepo);
    
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

// Gets number of lines bet on input from user and returns the amount
const getNumberOfLines = () => {
    while(true)
    {
        const inputLines = prompt("Please enter the number of lines to bet on (1-3): ");
        const numLines = parseFloat(inputLines);
    
        if(isNaN(numLines) || numLines <= 0 || numLines > ROWS)
        {
            console.log("Invalid number of lines, try again.");
        }
        else
        {
            return numLines;
        }
    }
}

// Gets bet input from user and returns the amount
const getBet = (balance, lines) => {
    while(true)
    {
        const inputBet = prompt("Please enter your bet per line: ");
        const betAmount = parseFloat(inputBet);
    
        if(isNaN(betAmount) || betAmount <= 0 || betAmount > balance / lines)
        {
            console.log("Invalid bet, try again.");
        }
        else
        {
            return betAmount;
        }
    }
}

// Spins slot and randomizes reel symbols
const spinSlot = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}

// Transposes array from cols to rows
const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

// Prints slot result to the console
const printSlot = (reelRows) => {
    console.log("Spinning slot...");
    for(const row of reelRows){
        for(const[i, symbol] of row.entries()){
            if(i != row.length - 1)
            {
                process.stdout.write(symbol + " | ");
            }
            else
            {
                console.log(symbol);
            }
        }
    }
}

// Checks if row passed in has all matching symbols
const checkRowResult = (row) => {
    let rowWon = true;
    for(const symbol of row)
    {
        if(symbol != row[0]){
            rowWon = false;
            break;
        }
    }
    return rowWon;
}

// Checks if won based on number of lines bet, calculates winnings, and returns winnings
const checkWinner = (reelRows, lines, bet) => {
    let winnings = 0;
    let numRowsWon = 0;
    for(let i = 0; i < lines; i++)
    {
        let row = reelRows[i];
        
        if(checkRowResult(row) == true)
        {
            numRowsWon++;
            winnings += bet * SYMBOL_VALUES[row[0]]
            console.log("TEST : " + row);
        }

    }
    switch(numRowsWon)
    {
        default:
        console.log("Better luck next time...");
        break;
        case 1:
        console.log("You won!");
        break;
        case 2:
        console.log("Two paylines won, nice!");
        break;
        case 3:
        console.log("All three paylines won! Jackpot!!!");
        break;
    }
    console.log("Received $" + winnings);
    return winnings;
}

// Plays the slot game!
const game = () => {
    let balance = depositMoney();

    while(true)
    {
        console.log("You have a balance of $" + balance + ".");
        const lines = getNumberOfLines();
        const bet = getBet(balance, lines);
        balance -= (bet * lines);
        const reels = spinSlot();
        const reelRows = transpose(reels);
        printSlot(reelRows);
        let wonAmount = checkWinner(reelRows, lines, bet);
        balance += wonAmount;

        if(balance <= 0)
        {
            console.log("No more money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if(playAgain != "y") break;
    }

}
// Start
game();