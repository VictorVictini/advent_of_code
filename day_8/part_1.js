import {input} from './input.js';

// checks that for the given axis and direction (up -> positive, down -> negative, right -> positive, left -> negative)
// are less than the value of the given axis in the relevant row/column
function check(grid, axis, direction, xAxis, yAxis) {
    if (axis == "x") {
        for (let y = yAxis - direction; direction == 1 ? y >= 0: y < grid[0].length; y -= direction) {
            if (grid[xAxis][y] >= grid[xAxis][yAxis]) return true;
        }
    } else { // y
        for (let x = xAxis - direction; direction == 1 ? x >= 0: x < grid.length; x -= direction) {
            if (grid[x][yAxis] >= grid[xAxis][yAxis]) return true;
        }
    }
    return false;
}

// formatting input string in grid-like data structure
const grid = [];
input.split("\n").forEach((line, y) => {
    line.split("").forEach((val, x) => {
        if (!grid[x]) grid[x] = [];
        grid[x][y] = parseInt(val);
    });
});

let invisible = 0;
for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
        if (check(grid, "x", 1, x, y) &&
            check(grid, "x", -1, x, y) &&
            check(grid, "y", 1, x, y) &&
            check(grid, "y", -1, x, y)) invisible++;
    }
}
console.log(grid[0].length * grid.length - invisible);