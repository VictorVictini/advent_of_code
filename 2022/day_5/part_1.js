import {input} from './input.js';

// separating input strings into two parts
const [arrInput, stepsInput] = input.split("\n\n");

// parsing first part to get the array of arrays (of chars)
// starting the arrays top-down
const arr = [];
const tempArr = arrInput.split("\n");
for (let i = 1; i < tempArr[0].length; i += 4) {
    const temp = [];
    for (let j = 0; j < tempArr.length - 1; j++) {
        if (tempArr[j][i] != " ") temp.push(tempArr[j][i]);
    }
    arr.push(temp);
}

// parsing the second part to put it into a legible data structure
const steps = [];
stepsInput.split("\n").forEach(step => {
    const [,amount, start, end] = /.*?(\d+).*?(\d+).*?(\d+)/.exec(step);
    steps.push({
        amount: parseInt(amount),
        start: start - 1,
        end: end - 1
    });
});
console.log(arr);

// goes through the relevant steps, moving the array as it does
steps.forEach(step => {
    for (let i = 0; i < step.amount; i++) {        
        arr[step.end].unshift(arr[step.start].shift());
    }
});

// creates a string of the first element of each sub-array
console.log(arr.reduce((prev, curr) => prev + curr[0]));