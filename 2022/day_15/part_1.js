import {input} from './input.js';
const row = 2000000; // row to check for

// parse for sensors and their related beacons
let coords = input
    .split("\n")
    .map((val, i) => {
        const [sensor, beacon] = val.split(":");
        const sx = /-?\d+/g.exec(sensor);
        const sy = /-?\d+$/g.exec(sensor);
        const bx = /-?\d+/g.exec(beacon);
        const by = /-?\d+$/g.exec(beacon);
        return {
            sensor: {
                x: parseInt(sx),
                y: parseInt(sy)
            },
            beacon: {
                x: parseInt(bx),
                y: parseInt(by)
            },
            max_move: Math.abs(parseInt(bx) - parseInt(sx)) + Math.abs(parseInt(by) - parseInt(sy))
        }
    });
    
// tossing in y-axis limits at the relevant row, if possible
coords.forEach((data, i) => {
    let maxY = data.sensor.y + data.max_move;
    let minY = data.sensor.y - data.max_move;
    if (minY < row && maxY < row || minY > row && maxY > row) return;
    const dif = Math.abs(data.max_move - Math.abs(row - data.sensor.y));
    coords[i].minX = data.sensor.x - dif;
    coords[i].maxX = data.sensor.x + dif;
});

// difference between smallest and largest values
console.log(Math.abs(Math.max(...coords.map(val => val.maxX ? val.maxX : 0)) - Math.min(...coords.map(val => val.minX ? val.minX : 0))));