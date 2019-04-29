import { combineReducers } from "redux";
import auth from "./reducers/auth";
import ui from "./reducers/ui";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import categories from "./reducers/categories";
import posts from "./reducers/posts";
import comments from "./reducers/comments";

const rootReducer = combineReducers({
    auth: auth,
    categories: categories,
    posts: posts,
    comments: comments,
    ui: ui,
});

const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;