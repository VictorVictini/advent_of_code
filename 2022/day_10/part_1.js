import {input} from './input.js';

// restructuring the data such that I have an array of objects that have a step (when the value within the register is incremented) and the amount to increment by
const steps = [{step: 0, amount: 1}];
let i = 0;
input.split("\n").forEach(line => {
    if (line == "noop") return i++;
    let amount = parseInt(/-?\d+$/.exec(line));
    i += 2;
    steps.push({
        step: i + 1,
        amount: amount
    });
});

// calculate signal strength
const limits = [20, 60, 100, 140, 180, 220];
i = 0;
let val = 0;
let signalStrength = 0;
steps.forEach(step => {
    if (step.step > limits[i]) {
        signalStrength += limits[i] * val;
        i++;
    }
    val += step.amount;
});

console.log(signalStrength);