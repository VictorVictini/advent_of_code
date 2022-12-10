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

// mapping out head's movement, tail following, and a history of positions the tail has been as well as the amount of times the tail has been in that position
const head = {
    x: 0,
    y: 0
};
const tail = JSON.parse(JSON.stringify(head));
const pos = [];
instructions.forEach(inst => {
    for (let i = inst.move; i > 0; i--) {
        head[inst.axis] += inst.direction;
        
        // initialising pos for tail's current pos if not done alrdy
        if (pos.findIndex(val => tail.x == val.x && tail.y == val.y) == -1) {
            pos.push({
                x: tail.x,
                y: tail.y,
                amount: 0
            });
        }

        // calculating distance from tail to head
        const differX = Math.abs(head.x - tail.x);
        const differY = Math.abs(head.y - tail.y);

        // changing tail's pos to head's prev pos, updating pos where needed
        if (differX >= 2 || differY >= 2) {
            const index = pos.findIndex(val => val.x == tail.x && val.y == tail.y);
            pos[index].amount++;

            if (tail.y == head.y) {
                tail.x += head.x > tail.x ? 1 : -1;
            } else if (tail.x == head.x) {
                tail.y += head.y > tail.y ? 1 : -1;
            } else {
                tail.x += head.x > tail.x ? 1 : -1;
                tail.y += head.y > tail.y ? 1 : -1;
            }
        }
    }
});

// adding the last position of the tail
const index = pos.findIndex(val => tail.x == val.x && tail.y == val.y);
if (index == -1) {
    pos.push({
        x: tail.x,
        y: tail.y,
        amount: 0
    });
} else {
    pos[index].amount++;
}

console.log(pos.length);