import { todos } from '../../todos.json';

const initialState = {todos};

export default (state = initialState, action) => {
    switch(action.type) {
        case "ADD":
            return [...state.todos, action.payload];
        default:
            return state;
    }
}