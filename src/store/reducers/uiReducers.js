import {
    UI_ADD_FLASH_MESSAGE, UI_DELETE_FLASH_MESSAGE, UI_POP_ITEM_FROM_VIEW_HISTORY,
    UI_START_LOADING, UI_STOP_LOADING, UI_UPDATE_SCREEN_UPDATE_LIST,
    UI_UPDATE_VIEW_HISTORY
} from "../actions/actionTypes";
import * as _ from "lodash";
import {toggleItemInArray} from "../../utils/helper/helper";

const initialState = {
    isLoading: false,
    viewHistory: [],
    refreshList: []
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

            if (viewHistory.length > 0) {
                let lastItem = viewHistory[viewHistory.length - 1];
                let newItem = action.payload;

                if (lastItem.routeName === newItem.routeName && _.isEqual(lastItem.params, newItem.params)) {
                    viewHistory.pop();
                    viewHistory = viewHistory.concat([action.payload]);
                } else {
                    viewHistory = viewHistory.concat([action.payload]);
                }
            } else {
                viewHistory = viewHistory.concat([action.payload]);
            }

            return {
                ...state,
                viewHistory: viewHistory,
            };

        case UI_POP_ITEM_FROM_VIEW_HISTORY:
            let newViewHistory = [...state.viewHistory];

            // Remove the last item only if at least 2 items are present.
            // Removing all items can result in undesired behaviour of not going back at all.
            if (newViewHistory.length > 1) {
                newViewHistory.pop();
            }

            return {
                ...state,
                viewHistory: newViewHistory
            };

        case UI_UPDATE_SCREEN_UPDATE_LIST:
            let refreshList = [...state.refreshList];
            refreshList = toggleItemInArray(refreshList, action.payload);

            return {
                ...state,
                refreshList: refreshList
            };

        case UI_ADD_FLASH_MESSAGE:
            return [
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ];

        case UI_DELETE_FLASH_MESSAGE:
            const index = findIndex(state, {id: action.id});
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                ];
            }
            return state;

        default:
            return state;
    }
};

export default uiReducers;