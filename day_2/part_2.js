import {input} from './input.js';

// restructuring input into an easier data structure to work with, lots of replacements for readability
const arr = input
    .replace(/A/g, "rock")
    .replace(/B/g, "paper")
    .replace(/C/g, "scissor")
    .replace(/X/g, "lose")
    .replace(/Y/g, "draw")
    .replace(/Z/g, "win")
    .split("\n")
    .map(val => val.split(" "));

const conditions = {
    rock: {
        lose: "scissor",
        win: "paper",
        draw: "rock"
    },
    paper: {
        lose: "rock",
        win: "scissor",
        draw: "paper"
    },
    scissor: {
        lose: "paper",
        win: "rock",
        draw: "scissor"
    }
}

// getting total score
let total = 0;
arr.forEach(([oppChoice, cond]) => {
    const choice = conditions[oppChoice][cond]; // getting the relevant pair to meet the win/lose/draw requirement

    // Alternative ternary operator
    // total += choice == "rock" ? 1 : choice == "paper" ? 2 : 3;
    if (choice == "rock") { // possibly rewrite into an ugly ternary operator
        total++;
    } else if (choice == "paper") {
        total += 2;
    } else {
        total += 3;
    }

    // Alternative ternary operator
    //total += choice == oppChoice ? 3 : (oppChoice == "rock" && choice == "paper") || (oppChoice == "paper" && choice == "scissor") || (oppChoice == "scissor" && choice == "rock") ? 6 : 0;
    if (choice == oppChoice) {
        total += 3;
    } else if ((oppChoice == "rock" && choice == "paper") ||
               (oppChoice == "paper" && choice == "scissor") ||
               (oppChoice == "scissor" && choice == "rock")) {
        total += 6;
    }
});
console.log(total);