import { CREATE_GRID, PROCESS_NEXT_GENERATION } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case CREATE_GRID:
            return action.payload;
        case PROCESS_NEXT_GENERATION:
            const resultingGrid = JSON.parse(JSON.stringify(state));
            for (let i = 0; i < state.length; i++) {
                for (let j = 0; j < state[i].length; j++) {
                    let numLivingNeighbors = 0;
                    let currentX = i - 1;
                    while (currentX <= i + 1 && currentX < state.length) {
                        let currentY = j - 1;
                        while (currentY <= j + 1 && currentY < state[i].length) {
                            if (currentX < 0) {
                                break;
                            }
                            if (currentY < 0 || (currentX === i && currentY === j)) {
                                currentY++;
                                continue;
                            }
                            if (state[currentX][currentY].isAlive) {
                                numLivingNeighbors++;
                            }
                            currentY++;
                        }
                        currentX++;
                    }
                    if (state[i][j].isAlive) {
                        if (numLivingNeighbors < 2 || numLivingNeighbors > 3) {
                            resultingGrid[i][j].isAlive = false;
                        }
                    } else {
                        if (numLivingNeighbors === 3) {
                            resultingGrid[i][j].isAlive = true;
                        }
                    }
                }
            }
            return resultingGrid;
        default: 
            return state;
    }
};