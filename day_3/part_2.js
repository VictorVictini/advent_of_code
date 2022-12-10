import {input} from './input.js';

// turning the data given into a manageable data structure
const tempArr = input.split("\n");
const arr = [];
let group = [,,];
tempArr.forEach((val, index) => {
    group[index % 3] = val.split("");
    if (index % 3 == 2 && index != 0) arr.push(JSON.parse(JSON.stringify(group))); // must make a deep copy to avoid pointers making it so every group is the same
});

let total = 0;
arr.forEach(([first, second, third]) => {

    // finding the unique letter
    let item = first.reduce((prev, curr) => second.includes(curr) && third.includes(curr) ? curr : prev);
    
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