import {input} from './input.js';

// turning data into something manageable
const pairs = input.split("\n\n").map(pair => pair.split("\n").map(json => JSON.parse(json)));

// recursive function to determine if the data given is ordered
function isOrdered(left, right) {
    if (typeof(left) == "number") {
        if (typeof(right) == "number") {
            if (left == right) return;
            return left < right;

        // left is a number, right is an array
        } else {
            return isOrdered([left], right);
        }
    }

    // right is a number, left is an array
    if (typeof(right) == "number") {
        return isOrdered(left, [right]);
    }

    // both are arrays
    if (left.length == 0) return true;
    if (right.length == 0) return false;
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
        const details = isOrdered(left[i], right[i]);
        if (typeof(details) == "boolean") return details;
    }
    if (left.length == right.length) return;
    return left.length < right.length;
}

let total = 0;
for (let i = 0; i < pairs.length; i++) {
    if (isOrdered(pairs[i][0], pairs[i][1])) total += i + 1;
}
console.log(total);