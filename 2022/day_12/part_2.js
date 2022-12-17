import {input} from './input.js';

// implementing bfs
function bfs(start, end) {
    const queue = [{node: start, path: [start]}];
    const visited = new Set();
    while (queue.length > 0) {
        const {node, path} = queue.shift();
        if (node == end) return path.length - 1;
        if (visited.has(node)) continue;
        visited.add(node);
        nodes[node].next.forEach(child => queue.push({node: child, path: [...path, child]}));
    }
    return 99999999;
}

// setting up nodes in terms of x and y pos, and finding start & end
const nodes = [];
let end;
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
        if (step == "E") {
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

// finding the shortest path from start pos
let min = 99999999999;
nodes.forEach((node, i) => {
    if (node.val != 97) return;
    const len = bfs(i, end);
    if (len < min) min = len;
});
console.log(min);