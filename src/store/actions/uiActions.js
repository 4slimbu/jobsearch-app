import {
    UI_ADD_FLASH_MESSAGE, UI_DELETE_FLASH_MESSAGE,
    UI_FLASH_MESSAGE, UI_POP_ITEM_FROM_VIEW_HISTORY, UI_START_LOADING, UI_STOP_LOADING, UI_UPDATE_SCREEN_UPDATE_LIST,
    UI_UPDATE_VIEW_HISTORY
} from './actionTypes';

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

export const uiAddFlashMessage = (message) => {
    return {
        type: UI_ADD_FLASH_MESSAGE,
        message
    };
};

export const uiDeleteFlashMessage = (id) => {
    return {
        type: UI_DELETE_FLASH_MESSAGE,
        id
    };
};

export const uiUpdateViewHistory = (navData) => {
    return {
        type: UI_UPDATE_VIEW_HISTORY,
        payload: navData
    };
};


export const uiPopItemFromViewHistory = () => {
    return {
        type: UI_POP_ITEM_FROM_VIEW_HISTORY
    };
};