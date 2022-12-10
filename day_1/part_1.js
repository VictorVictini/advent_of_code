import {input} from './input.js';

// restructuring input string into useful data types
const arr = [];
input.split('\n\n').forEach(elf => {
    arr.push(elf.split('\n').map(Number));
});

// getting an array of the total calories held per elf
const totals = [];
arr.forEach(inner => {
    totals.push(inner.reduce((previous, current) => previous + current));
});

// getting the highest total calories held by a single elf
console.log(Math.max(...totals));