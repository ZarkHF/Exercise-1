import {createStore, combineReducers } from 'redux'
import todoReducer from './reducers/todoReducer'

const reducers = combineReducers({
    todoReducer
})

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;