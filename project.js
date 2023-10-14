/* 
    Steps:

    Check if won
    If won, give user winnings
    If lost, take their bet
    Play again ?
*/

//const prompt = require("prompt-sync")();
import promptSync from 'prompt-sync';
import { setTimeout } from "timers/promises";
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
    
        if(isNaN(numLines) || numLines <= 0 || numLines > 3)
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

const printSlot = async (reelRows) => {
    console.log("Spinning slot...");
    for(const row of reelRows){
        await(setTimeout(1000));
        for(const[i, symbol] of row.entries()){
            //rowString += symbol;
            await setTimeout(500);
            if(i != row.length - 1)
            {
                //rowString += " | ";
                process.stdout.write(symbol + " | ");
            }
            else
            {
                console.log(symbol);
            }
            //console.log(rowString);
        }
    }
}

const checkRowResult = (row) => {
    let rowWon = true;
    for(let i = 0; i < row.length - 1; i++)
    {
        if(row[i] != row[i+1]){
            rowWon = false;
        }
    }
    return rowWon;
}

const checkWinner = (reelRows) => {
    let numRowsWon = 0;
    for(const row of reelRows)
    {
        if(checkRowResult(row) == true)
        {
            switch(numRowsWon)
            {
                default:
                console.log("You won!");
                break;
                case 1:
                console.log("Two paylines won!");
                break;
                case 2:
                console.log("All three paylines won! Jackpot!!!");
                break;
            }
            numRowsWon++;
        }
        else if(numRowsWon == 0)
        {
            console.log("Better luck next time...");
        }
    }
}


let balance = depositMoney();
const lines = getNumberOfLines();
const bet = getBet(balance, lines);
const reels = spinSlot();
const reelRows = transpose(reels);
printSlot(reelRows);
checkWinner(reelRows);