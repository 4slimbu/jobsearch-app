import { combineReducers } from "redux";
import mainReducer from "./reducers/mainReducer";
import auth from "./reducers/auth";
import ui from "./reducers/ui";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    auth: auth,
    ui: ui,
});

const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;