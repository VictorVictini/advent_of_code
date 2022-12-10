import {input} from './input.js';

const arr = input.split("\n").map(val => val.split(",").map(v => v.split("-").map(Number)));

let total = 0;
arr.forEach(([first, second]) => {
    if ((first[0] <= second[0] && first[1] >= second[1]) ||
        (second[0] <= first[0] && second[1] >= first[1])) total++;
});
console.log(total);