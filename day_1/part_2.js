import {input} from './input.js';

// restructuring input string into useful data types
const arr = [];
input.split('\n\n').forEach(elf => {
    arr.push(elf.split('\n').map(Number));
});

// getting an array of the total calories held per elf
let totals = [];
arr.forEach(inner => {
    totals.push(inner.reduce((previous, current) => previous + current));
});

// getting the highest total calories held by the top 3 elves
totals = totals.sort((a, b) => b - a);
let elves = [totals[0], totals[1], totals[2]];

// sum of elves array
console.log(elves.reduce((prev, curr) => prev + curr));