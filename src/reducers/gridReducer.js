import { CREATE_GRID } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case CREATE_GRID:
            return action.payload;
            // maybe add || null or false if it takes too long to create grid
        default: 
            return state;
    }
};