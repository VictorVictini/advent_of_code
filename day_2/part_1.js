import {input} from './input.js';

// restructuring input into an easier data structure to work with
const arr = input
    .replace(/A|X/g, "rock")
    .replace(/B|Y/g, "paper")
    .replace(/C|Z/g, "scissor")
    .split("\n")
    .map(val => val.split(" "));

// getting total score
let total = 0;
arr.forEach(([oppChoice, choice]) => {
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