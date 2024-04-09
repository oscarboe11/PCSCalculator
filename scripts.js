
function start() {
    set = document.getElementById("noteInput").value;
    set = set.replace(/\s/g, "");

    if(verifySet(set)) {
        document.getElementById("invalid").style = "display: none;"
        let setArr = toArr(set);
        getNormalOrder(setArr);

        let normalSet = toString(setArr);
        document.getElementById("normalOrderText").innerHTML = "Normal Order: " + normalSet;
        console.log(transpose(normalSet, 2));
    } else {
        document.getElementById("invalidText").innerHTML = set + " is NOT a valid set.";
        document.getElementById("invalid").style = "display: block;"
    }
}

function getNormalOrder(arr) {
    let min = 13
    let minIndex = 0;
    for(let i = 0; i < arr.length; i++) {
        let num1 = arr[i];
        let num2 = arr[(i + arr.length - 1) % arr.length];
        
        if(subtract(num2, num1) < min) {
            min = subtract(num2, num1);
            minIndex = i;
        }
    }

    rotate(arr, minIndex);
}

function transpose(arr, num) {
    let result = [];
    for(const element of arr) {
        sum = add(element, num);
        result.push(sum);
    }

    return result;
}

function rotate(arr, index) {
    let arr2 = arr.slice();
    for(let i = 0; i < arr.length; i++) {
        arr[i] = arr2[(i + index) % arr.length];
    }
}

function add(num1, num2) {
    return (num1 + num2) % 12
}

function mod(a, n) {
    return a - (n * Math.floor(a/n));
}

function subtract(num2, num1) {
    return mod(num2 - num1, 12);
}

function verifySet(set) {
    let setTest = /^[0-9te]+$/;

    return setTest.test(set);
}

function toArr(set) {
    let arr = [];
    for(const element of set) {
        if(element == "e") {
            arr.push(11);
        } else if(element == "t") {
            arr.push(10);
        } else {
            arr.push(parseInt(element));
        }
    }

    arr = [...new Set(arr)];
    arr.sort(function(a, b){return a - b});
    return arr;
}

function toString(arr) {
    let set = "";
    for(const element of arr) {
        if(element == 11) {
            set += "e "; 
        } else if(element == 10) {
            set += "t "
        } else {
            set += element.toString() + " ";
        }
    }

    return set.trim();
}