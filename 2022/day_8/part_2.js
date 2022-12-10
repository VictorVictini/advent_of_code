import {input} from './input.js';

// calculate number of trees in given direction that are not >= current tree's size
function findNoTrees(grid, axis, direction, xAxis, yAxis) {
    if (xAxis == 0 || yAxis == 0 || xAxis == grid.length - 1 || yAxis == grid[0].length - 1) return 0;
    let trees = 0;
    if (axis == "x") {
        for (let y = yAxis - direction; direction == 1 ? y >= 0: y < grid[0].length; y -= direction) {
            trees++;
            if (grid[xAxis][y] >= grid[xAxis][yAxis]) return trees;
        }
    } else { // y
        for (let x = xAxis - direction; direction == 1 ? x >= 0: x < grid.length; x -= direction) {
            trees++;
            if (grid[x][yAxis] >= grid[xAxis][yAxis]) return trees;
        }
    }
    return trees;
}

// formatting input string in grid-like data structure
const grid = [];
input.split("\n").forEach((line, y) => {
    line.split("").forEach((val, x) => {
        if (!grid[x]) grid[x] = [];
        grid[x][y] = parseInt(val);
    });
});

// creating a new grid that is of their scenic value rather than the value they hold
const scenic = [];
for (let x = 1; x < grid.length - 1; x++) {
    for (let y = 1; y < grid[0].length - 1; y++) {
        scenic.push(
            findNoTrees(grid, "x", 1, x, y) *
            findNoTrees(grid, "x", -1, x, y) *
            findNoTrees(grid, "y", 1, x, y) *
            findNoTrees(grid, "y", -1, x, y)                
        );
    }
}

// finding tree with highest scenic value
console.log(scenic);
console.log(Math.max(...scenic), scenic.length, grid.length, grid[0].length);