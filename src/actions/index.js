import { CREATE_GRID } from './types';

export const createGrid = (x, y) => {
    const grid = new Array(x);
    for (let i = 0; i < x; i++) {
        grid[i] = new Array(y);
    }

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            grid[i][j] = {
                coordX: i,
                coordY: j,
                isAlive: Math.random() >= 0.5
            };
        }
    }

    return { type: CREATE_GRID, payload: grid };
}