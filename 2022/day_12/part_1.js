import {input} from './input.js';

// setting up nodes in terms of x and y pos, and finding start & end
const nodes = [];
let start, end;
const split = input.split("\n").map(val => val.split(""));
split.forEach((line, y) => {
    line.forEach((step, x) => { 
        // setting up list of connected nodes 
        nodes.push({
            x: x,
            y: y,
            val: step == "S" ? 97 : step == "E" ? 122 : step.charCodeAt(0),
            next: []
        });

        // setting up where to place in nodes list
        if (step == "S") {
            start = nodes.length - 1;
        } else if (step == "E") {
            end = nodes.length - 1;
        }
    })
});

// setting up where the nodes go to next
split.forEach((line, y) => {
    line.forEach((step, x) => {
        let node = nodes.find(val => val.x == x && val.y == y);
        if (!node) return;
        const right = nodes.findIndex(val => val.x + 1 == x && val.y == y && node.val + 1 >= val.val);
        const left = nodes.findIndex(val => val.x - 1 == x && val.y == y && node.val + 1 >= val.val);
        const up = nodes.findIndex(val => val.x == x && val.y + 1 == y && node.val + 1 >= val.val);
        const down = nodes.findIndex(val => val.x == x && val.y - 1 == y && node.val + 1 >= val.val);
        if (right != -1) node.next.push(right);
        if (left != -1) node.next.push(left);
        if (up != -1) node.next.push(up);
        if (down != -1) node.next.push(down);  
    });
});

// implementing bfs
let finalPath;
const queue = [{node: start, path: [start]}];
const visited = new Set();
while (queue.length > 0) {
    const {node, path} = queue.shift();
    if (node == end) {
        finalPath = path;
        break;
    };
    if (visited.has(node)) continue;
    visited.add(node);
    nodes[node].next.forEach(child => queue.push({node: child, path:[...path, child]}));
}
console.log(finalPath.length - 1);