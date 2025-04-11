let i = 25;
let j = 60;

const interval = setInterval(() => {
    if (j === 0) {
        j = 60;
        i--;
    }
    if (i === 0 && j === 0) {
        clearInterval(interval);
        return;
    }
    console.log(i, j);
    j--;
}, 1000);
