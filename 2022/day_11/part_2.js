import {input} from './input.js';

// building monkeys array of objects
const monkeys = input.split("\n\n").map(val => {
    let details = val.split("\n").map(val => val.split(": "));
    details[2][1] = details[2][1].split(" ");
    let monkey = {
        items: details[1][1].split(", ").map(Number),
        operation: {
            type: details[2][1][3] == "*" ? "multiply" : "add",
            first: details[2][1][2] == "old" ? "old" : parseInt(details[2][1][2]),
            second: details[2][1][4] == "old" ? "old" : parseInt(details[2][1][4]),
        },
        test: {
            divisor: parseInt(details[3][1].split(" ")[2]),
            true: parseInt(details[4][1].split(" ")[3]),
            false: parseInt(details[5][1].split(" ")[3]),
        },
    };
    return monkey;
});

// calculating multiple that is formed from all the divisors
let mod = 1;
for (let i = 0; i < monkeys.length; i++) {
    mod *= monkeys[i].test.divisor;
}

// initialising counter as 0 for each monkey
const counter = [];
for (let i = 0; i < monkeys.length; i++) {
    counter[i] = 0;
}

for (let c = 0; c < 10000; c++) {
    for (let i = 0; i < monkeys.length; i++) { // each monkey
        while (monkeys[i].items.length != 0) { // index can be ignored in this context, since we always check the first one, meaning we just want
            let item = monkeys[i].items[0]; // since we use .unshift() the next item to be checked is always the first one

            // parsing math applied to item
            const first = monkeys[i].operation.first == "old" ? item : monkeys[i].operation.first;
            const second = monkeys[i].operation.second == "old" ? item : monkeys[i].operation.second;
            if (monkeys[i].operation.type == "add") {
                item = first + second;
            } else {
                item = first * second;
            }
            item %= mod;

            // incrementing number for inspection

            counter[i]++;

            // switching the item over to the next monkey
            monkeys[monkeys[i].test[item % monkeys[i].test.divisor == 0]].items.push(item); 
            monkeys[i].items.shift();
        }
    }
}

// two max
counter.sort((a, b) => b - a);
const max = counter[0] * counter[1];

console.log(max);