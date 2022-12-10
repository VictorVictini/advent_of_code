import {input} from './input.js';

// deconstructing the input into an of objects i.e. instructions
const directionDetails = {
    R: {
        axis: "x",
        direction: +1,
    },
    L: {
        axis: "x",
        direction: -1,
    },
    U: {
        axis: "y",
        direction: +1,
    },
    D: {
        axis: "y",
        direction: -1,
    },
};
const instructions = [];
input.split("\n").forEach(line => {
    const [letter, amount] = line.split(" ");
    instructions.push({
        axis: directionDetails[letter].axis,
        direction: directionDetails[letter].direction,
        move: parseInt(amount)
    });
});

// creating an array of objects for the rope
const rope = [];
for (let i = 0; i < 10; i++) {
    rope.push({
        x: 0,
        y: 0
    });
}

// mapping out head's movement, tails following, and a history of positions the last tail has been as well as the amount of times the tail has been in that position
const pos = [];
instructions.forEach(inst => {
    for (let j = inst.move; j > 0; j--) { // j is unused, just a counter for a fixed number of loops
        rope[0][inst.axis] += inst.direction;

        let isLinked;
        do {
            for (let i = 0; i < rope.length - 1; i++) {
                // initialising pos for tail's current pos if not done alrdy
                if (i == rope.length - 2 && pos.findIndex(val => rope[i + 1].x == val.x && rope[i + 1].y == val.y) == -1) {
                    pos.push({
                        x: rope[rope.length - 1].x,
                        y: rope[rope.length - 1].y,
                        amount: 0
                    });
                }

                // calculating distance from tail to head
                const differX = Math.abs(rope[i].x - rope[i + 1].x);
                const differY = Math.abs(rope[i].y - rope[i + 1].y);

                // changing tail's pos to head's prev pos, updating pos where needed
                if (differX >= 2 || differY >= 2) {
                    if (i == rope.length - 2) {
                        const index = pos.findIndex(val => val.x == rope[i + 1].x && val.y == rope[i + 1].y);
                        pos[index].amount++;
                    }

                    if (rope[i + 1].y == rope[i].y) {
                        rope[i + 1].x += rope[i].x > rope[i + 1].x ? 1 : -1;
                    } else if (rope[i + 1].x == rope[i].x) {
                        rope[i + 1].y += rope[i].y > rope[i + 1].y ? 1 : -1;
                    } else {
                        rope[i + 1].x += rope[i].x > rope[i + 1].x ? 1 : -1;
                        rope[i + 1].y += rope[i].y > rope[i + 1].y ? 1 : -1;
                    }
                }
            }

            // separate check that the entire rope is 'linked'
            isLinked = true;
            for (let i = 0; i < rope.length - 1; i++) {
                const differX = Math.abs(rope[i].x - rope[i + 1].x);
                const differY = Math.abs(rope[i].y - rope[i + 1].y);
                if (differX < 2 && differY <= 2) isLinked = false;
            }
        } while (isLinked);
    }
});

// adding the last position of the tail
const index = pos.findIndex(val => rope[rope.length - 1].x == val.x && rope[rope.length - 1].y == val.y);
if (index == -1) {
    pos.push({
        x: rope[rope.length - 1].x,
        y: rope[rope.length - 1].y,
        amount: 0
    });
} else {
    pos[index].amount++;
}

console.log(pos.length);