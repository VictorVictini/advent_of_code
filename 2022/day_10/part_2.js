import {input} from './input.js';

// restructuring data given for step against the value at that point in the step
const steps = [{step: 0, val: 1}];
let i = 0;
let val = 1;
input.split("\n").forEach(line => {
    if (line == "noop") return i++;
    let amount = parseInt(/-?\d+$/.exec(line));
    i += 2;
    val += amount;
    steps.push({
        step: i + 1,
        val: val
    });
});

// building the string
let str = "";
let currVal;
for (let i = 0; i < 240; i++) {
    if (i % 40 == 0 && i != 0) {
        str += "\n";
    }
    let pos = i % 40;
    if (steps.findIndex(step => step.step == i) != -1) {
        currVal = steps.find(step => step.step == i).val;
    }
    if (i % 40 == 0) continue;
    if (pos == currVal || pos == (currVal + 1) || pos == (currVal + 2)) {
        str += "🟦";
        continue;
    }
    str += "⬛";
}
console.log(str);