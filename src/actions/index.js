import { CREATE_GRID, PROCESS_NEXT_GENERATION } from './types';

export const createGrid = (x, y) => {
    // console.log("Inside create Grid" + x + ', ' + y);
    const grid = new Array(x);
    for (let i = 0; i < x; i++) {
        grid[i] = new Array(y);
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            // console.log("Adding stuff");
            grid[i][j] = {
                coordX: i,
                coordY: j,
                isAlive: Math.random() >= 0.5
            };
        }
    }
    return { type: CREATE_GRID, payload: grid };
}

export const processNextGeneration = () => {
    return { type: PROCESS_NEXT_GENERATION };
}