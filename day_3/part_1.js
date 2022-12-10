import {input} from './input.js';

// turning the data given into a manageable data structure
const arr = input.split("\n").map(val => [val.substring(0, val.length / 2).split(""), val.substring(val.length / 2).split("")]);

let total = 0;
arr.forEach(([first, second]) => {

    // finding the unique letter
    let item = first.reduce((prev, curr) => second.includes(curr) ? curr : prev);
    
    // calculating its value and adding it to the total
    // alternative ternary operator:
    //total += item.charCodeAt(0) - (item >= "A" && item <= "Z" ? 38 : 96);
    if (item >= "A" && item <= "Z") {
        total += item.charCodeAt(0) - 38;
    } else {
        total += item.charCodeAt(0) - 96;
    }
});
console.log(total);