import { combineReducers } from "redux";
import authReducers from "./reducers/authReducers";
import uiReducers from "./reducers/uiReducers";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import categoriesReducers from "./reducers/categoriesReducers";
import postsReducers from "./reducers/postsReducers";
import commentsReducers from "./reducers/commentsReducers";
import pagesReducers from "./reducers/pageReducers";
import formsReducers from "./reducers/formsReducers";

const rootReducer = combineReducers({
    auth: authReducers,
    categories: categoriesReducers,
    posts: postsReducers,
    pages: pagesReducers,
    comments: commentsReducers,
    forms: formsReducers,
    ui: uiReducers
});

const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export default configureStore;