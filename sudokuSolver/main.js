/*const grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
*/


const grid = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0]
];

const possible = (x, y, n) => {
    for(let i = 0; i < 9; ++i) {
        if(grid[y][i] == n) return false;
    }

    for(let i = 0; i < 9; ++i) {
        if(grid[i][x] == n) return false;
    }

    const x0 = Math.floor(x / 3) * 3;
    const y0 = Math.floor(y / 3) * 3;

    for(let i = 0; i < 3; ++i) {
        for(let j = 0; j < 3; ++j) {
            if(grid[y0 + i][x0 + j] == n) return false;
        }
    }

    return true;
}

const solve = () => {
    for(let y = 0; y < 9; ++y) {
        for(let x = 0; x < 9; ++x) {
            if(grid[y][x] == 0) {
                for(let n = 1; n < 10; ++n) {
                    if(possible(x, y, n)) {
                        grid[y][x] = n;
                        solve();
                        grid[y][x] = 0;
                    }
                }

                return;
            }
        }
    }

    console.table(grid);
}
