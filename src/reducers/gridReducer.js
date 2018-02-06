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
            /*
            // Alternative Algorithm *** Only initial performance gain, after first 3 generations, the first
            // algorithm appears to be more efficient ***
            const resultingGrid = JSON.parse(JSON.stringify(state));
       
            var currentCol = [0, 0];
            var nextCol = [0, 0];
            var numLivingNeighbors = 0;
            for (let i = 0; i < state[0].length; i++) {
                // Left Side
                currentCol = [0, 0];
                nextCol = [0, 0];
            
                let currentX = 0;
                let currentY = i - 1;
                
                while (currentX <= 1 && currentX < state[0].length) {
                    currentY = i - 1;
                    while (currentY <= i + 1 && currentY < state.length) {
                        if (currentY < 0) {
                            currentY++;
                            continue;
                        }
            
                        if (state[currentY][currentX].isAlive) {
                            if (currentX === 0) {
                                if (currentY !== i) {
                                    currentCol[0]++;
                                }
                                currentCol[1]++;
                            } else {
                                if (currentY !== i) {
                                    nextCol[1]++;
                                }
                                nextCol[0]++;
                            }
                        }
                        currentY++;
                    }
                    currentX++;
                }
                numLivingNeighbors = currentCol[0] + nextCol[0];
                
                if (state[i][0].isAlive) {

                    if (numLivingNeighbors < 2 || numLivingNeighbors > 3) {
                        resultingGrid[i][0].isAlive = false;
                    }
                } else {
                    if (numLivingNeighbors === 3) {
                        resultingGrid[i][0].isAlive = true;
                    }
                }
            
                // All other cells
                for (let j = 1; j < state.length; j++) { 
                        numLivingNeighbors = currentCol[1] + nextCol[1];
                        currentCol = nextCol.reverse();
                        nextCol = [0, 0];

                        let currentY = i - 1;
                        while (currentY <= i + 1 && currentY < state.length && j + 1 < state[0].length) {
                            if (currentY < 0) {
                                currentY++;
                                continue;
                            }
            
                            if (state[currentY][j + 1].isAlive) {
                                if (currentY !== i) {
                                    nextCol[1]++;
                                }
                                nextCol[0]++;
                            }
                            currentY++;
                        }
                        if (j + 1 !== state.length) {
                            numLivingNeighbors += nextCol[0];
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
            */
        default: 
            return state;
    }
};