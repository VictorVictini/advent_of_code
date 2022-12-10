let distance, lifts, floor, direction;
distance = [];
lifts = [
    ["","","","","A","","",""],
    ["S","","","","","","",""],
    ["","","D","","","","",""],
    ["","","","","","","D",""],
];
floor = 5;
direction = "DOWN";

function findDistance(lift, floor, direction) {
    // find lifts position & type
    let type, liftFloor;
    for (let i = 0; i < 8; i++) {
        if (lift[i] != "") {
            type = lift[i];
            liftFloor = i;
        }
    }
    
    // find unsuitable cases
    if ((liftFloor < floor && type == "D") ||
        (liftFloor > floor && type == "A") ||
        (type == "A" && direction == "DOWN") ||
        (type == "D" && direction == "UP")) return 99;
    return floor - liftFloor;
}

for (let i = 0; i < 4; i++) {
    distance.push(findDistance(lifts[i], floor, direction));
}

// finding nearest lift
let nearest = 0;
for (let i = 1; i < distance.length; i++) {
    if (Math.abs(distance[i]) < Math.abs(distance[nearest])) nearest = i; 
}
console.log(nearest, distance[nearest], distance);