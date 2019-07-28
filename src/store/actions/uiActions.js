import {UI_START_LOADING, UI_STOP_LOADING, UI_UPDATE_VIEW_HISTORY} from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const uiUpdateViewHistory = (navData) => {
    return {
        type: UI_UPDATE_VIEW_HISTORY,
        payload: navData
    };
};