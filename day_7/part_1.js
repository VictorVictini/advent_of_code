import {input} from './input.js';

// checks that the smaller array is one element less than the larger one
// checks that all of the elements in the smaller array at equivalent to the same ones (in the same positions) to the larger one
// effectively checking if the path of the larger array is one level deeper of the smaller one
function check(arr1, arr2) {
    if ((arr1.length != (arr2.length + 1)) && ((arr1.length + 1) != arr2.length)) return false;
    let small = arr1.length < arr2.length ? arr1 : arr2;
    let large = arr2.length > arr1.length ? arr2 : arr1;
    for (let i = 0; i < small.length; i++) {
        if (large[i] != small[i]) return false;
    }
    return true;
}

let prev = {};
let split = input.split("\n");
let instructions = [];
for (let i = 1; i < split.length; i++) { // skip the outer directory i.e. "cd /"
    const [, cmd, ...data] = split[i].split(" ");
    const res = {cmd};
    if (cmd == "ls") {
        let files = [];
        while ((++i) < split.length) { // increments i such that the next iteration of the loop begins after all of the data has been processed
            const info = split[i].split(" ");
            if (info[0] == "$") {
                i--; // so it starts at this step when it increments for the next iteration of the for loop
                break;
            }
            if (info[0] == "dir") {
                files.push({
                    type: "dir",
                    name: info[1]
                });
            } else {
                files.push({
                    type: "file",
                    name: info[1],
                    size: parseInt(info[0])
                });
            }
        }
        res.data = files;
    } else { // cd
        res.data = data[0];
    }
    instructions.push(res);
}

let directories = [];
let path = ["/"];
instructions.forEach(inst => {
    if (inst.cmd == "ls") {
        // create data structure with ambiguous directories where needed
        let curr = [];
        for (let i = 0; i < inst.data.length; i++) {
            curr.push(inst.data[i].type == "dir" ? inst.data[i].name : inst.data[i].size);
        }

        // putting the curr directory details into our list of directories
        directories.push({
            path: JSON.parse(JSON.stringify(path)), // makes a deep copy of the path array, avoids invisible pointers
            data: curr
        });
    } else {
        // figures out the current position
        if (inst.data == "/") {
            path = ["/"];
        } else if (inst.data == "..") {
            path.pop();
        } else {
            path.push(inst.data);
        }
    }
});

// sorting such that the directories at the deepest levels (i.e. where the path's length is largest) come first
directories.sort((a, b) => b.path.length - a.path.length);

// calculating totals of directories
directories.forEach(dir => {
    let total = 0;
    dir.data.forEach((data, i) => {
        if (typeof(data) == "string") return total += directories.find(d => d.path[d.path.length - 1] == data && check(dir.path, d.path)).total;
        total += data;
    });
    dir.total = total;
});

// total of all directories with a total size less than 100000
let total = 0;
directories.forEach(dir => {
    if (dir.total <= 100000) total += dir.total;
});
console.log(total);