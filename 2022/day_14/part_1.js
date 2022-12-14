import {input} from './input.js';

// parsing input into an object that has 1) starting x pos 2) starting y pos and 3) an array of "changes" to be applied
const instructions = input
    .split("\n")
    .map(rockDetails => rockDetails
        .split(" -> ")
        .map(coords => coords
            .split(",")
            .map(Number)))
    .map(rockDetails => {
        const changes = [];
        for (let i = 1; i < rockDetails.length; i++) {
            if (rockDetails[i][0] == rockDetails[i - 1][0]) { // if x axis are the same
                changes.push({
                    axis: "y",
                    amount: rockDetails[i][1] - rockDetails[i - 1][1],
                });
            } else { // y axis are the same
                changes.push({
                    axis: "x",
                    amount: rockDetails[i][0] - rockDetails[i - 1][0],
                });
            }
        }
        return {
            x: rockDetails[0][0],
            y: rockDetails[0][1],
            changes: changes,
        }
    });

// creating an array of objects containing x, y, and whether a spot is filled or not
const grid = [];
instructions.forEach(inst => {
    const obj = {
        x: inst.x,
        y: inst.y,
    }
    if (grid.findIndex(spot => spot.x == obj.x && spot.y == obj.y) == -1) grid.push(JSON.parse(JSON.stringify(obj)));
    inst.changes.forEach(changeRock => {
        for (let i = 0; i < Math.abs(changeRock.amount); i++) {
            obj[changeRock.axis] += Math.abs(changeRock.amount)/changeRock.amount;
            if (grid.findIndex(spot => spot.x == obj.x && spot.y == obj.y) == -1) grid.push(JSON.parse(JSON.stringify(obj)));
        }
    });
});

// finding largest y value
// if we fall more than this, we begin flowing into the abyss
const largestY = grid.reduce((prev, curr) => curr.y > prev.y ? curr : prev).y;

// simulating sand falling
let sandCoords;
let sandUnits = 0;
do {
    sandUnits++;
    sandCoords = {
        x: 500,
        y: 0
    }
    let notBlocked = true;
    do {
        if (sandCoords.y > largestY) break;
        if (grid.findIndex(spot => spot.x == sandCoords.x && spot.y == sandCoords.y + 1) == -1) { // if path directly below is not blocked
            sandCoords.y++;
        } else if (grid.findIndex(spot => spot.x == sandCoords.x - 1 && spot.y == sandCoords.y + 1) == -1) {
            sandCoords.x--;
            sandCoords.y++;
        } else if (grid.findIndex(spot => spot.x == sandCoords.x + 1 && spot.y == sandCoords.y + 1) == -1) {
            sandCoords.x++;
            sandCoords.y++;
        } else {
            notBlocked = false;
        }
    } while (notBlocked);
    grid.push(JSON.parse(JSON.stringify(sandCoords)));
} while (sandCoords.y <= largestY);

console.log(sandUnits - 1);