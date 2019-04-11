import { combineReducers } from "redux";
import mainReducer from "./reducers/mainReducer";
import { createStore, compose } from "redux";

const rootReducer = combineReducers({
    main: mainReducer
});

const configureStore = () => {
    return createStore(rootReducer, __DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
};

export default configureStore;