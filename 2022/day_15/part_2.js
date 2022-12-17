import {input} from './input.js';
const minLimit = 0;
const maxLimit = 4000000;

// function to whether a position currently has something occupying it
function isFilled(pos, ignore, sensors, min, max) {
    if (pos.x < min || pos.y < min || pos.x > max || pos.y > max) return true;
    for (let i = 0; i < sensors.length; i++) {
        if (i == ignore) continue;
        if (sensors[i].x < min || sensors[i].y < min || sensors[i].x > max || sensors[i].y > max) continue;
        let maxY = sensors[i].y + sensors[i].max_move;
        let minY = sensors[i].y - sensors[i].max_move;
        if (minY < pos.y && maxY < pos.y || minY > pos.y && maxY > pos.y) continue;
        const dif = Math.abs(sensors[i].max_move - Math.abs(pos.y - sensors[i].y));
        const minX = sensors[i].x - dif;
        const maxX = sensors[i].x + dif;
        if (pos.x >= minX && pos.x <= maxX) return true;
    }
    return false;
}

// parse for sensors and their related beacons
let sensors = input
    .split("\n")
    .map((val, i) => {
        const [sensor, beacon] = val.split(":");
        const sx = /-?\d+/g.exec(sensor);
        const sy = /-?\d+$/g.exec(sensor);
        const bx = /-?\d+/g.exec(beacon);
        const by = /-?\d+$/g.exec(beacon);
        return {
            x: parseInt(sx),
            y: parseInt(sy),
            max_move: Math.abs(parseInt(bx) - parseInt(sx)) + Math.abs(parseInt(by) - parseInt(sy))
        }
    });

// going around one space above every sensor until we find a spot which isn't covered by other sensors
let found;
for (let j = 0; j < sensors.length; j++) {
    let br = false;
    for (let i = 0; i < (sensors[j].max_move + 1); i++) {
        const left_top = {x: sensors[j].x - i, y: sensors[j].y + sensors[j].max_move + 1 - i};
        const left_bottom = {x: sensors[j].x - i, y: sensors[j].y - sensors[j].max_move - 1 + i};
        const right_top = {x: sensors[j].x + i, y: sensors[j].y + sensors[j].max_move + 1 - i};
        const right_bottom = {x: sensors[j].x + i, y: sensors[j].y - sensors[j].max_move - 1 + i};
        if (!isFilled(left_top, j, sensors, minLimit, maxLimit)) {
            br = true;
            found = left_top;
            break;
        }
        if (!isFilled(left_bottom, j, sensors, minLimit, maxLimit)) {
            br = true;
            found = left_bottom;
            break;
        }
        if (!isFilled(right_top, j, sensors, minLimit, maxLimit)) {
            br = true;
            found = right_top;
            break;
        }
        if (!isFilled(right_bottom, j, sensors, minLimit, maxLimit)) {
            br = true;
            found = right_bottom;
            break;
        }
    }
    if (br) break;
}
console.log(found.x * 4000000 + found.y);