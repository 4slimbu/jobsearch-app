import {UI_START_LOADING, UI_STOP_LOADING, UI_UPDATE_VIEW_HISTORY} from "../actions/actionTypes";
import * as _ from "lodash";

const initialState = {
    isLoading: false,
    viewHistory: []
};

const uiReducers = (state = initialState, action) => {
    switch (action.type) {
        case UI_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case UI_UPDATE_VIEW_HISTORY:
            let viewHistory = [...state.viewHistory];
            if (viewHistory.length > 15) {
                viewHistory.shift();
            }
            if (! _.isEqual(viewHistory[viewHistory.length - 1], action.payload)) {
                viewHistory = viewHistory.concat([action.payload]);
            } else {
                viewHistory.pop();
                viewHistory = viewHistory.concat([action.payload]);
            }

            return {
                ...state,
                viewHistory: viewHistory,
            };
        default:
            return state;
    }
};

export default uiReducers;