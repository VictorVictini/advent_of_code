import {input} from './input.js';

let curr = "";
let i;
for (i = 0; i < input.length && curr.length < 14; i++) {
    if (curr.includes(input[i])) {
        i -= curr.length;
        curr = "";
        continue;
    }
    curr += input[i];
}
console.log(input.indexOf(curr) + 14);