import {input} from './input.js';

// turning data into something manageable, and adding two extra dividers
const list = input.split(/\n+/g).map(json => JSON.parse(json));
list.push([[2]]);
list.push([[6]]);

// array of index for list, to avoid pointer issues
let index = list.map((val, i) => i);

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

// function to find where obj lands when sorted (by finding how many pos ahead of the other items it is)
function findPos(obj) {
    let pos = 0;
    for (let i = 0; i < index.length; i++) {
        if (!isOrdered(obj, list[index[i]])) pos++;
    }
    return pos;
}

console.log(findPos([[2]]) * findPos([[6]]));