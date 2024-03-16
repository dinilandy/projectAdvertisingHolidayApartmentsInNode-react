import { produce } from 'immer';

import { createStore } from 'redux';
const initialState = {

    currentUser: null,
    isAdvertiser: false,
    isUser: false,
    token: null

}
const reducer = produce((state, action) => {

    switch (action.type) {
        case 'SET_CURRENT_USER':
            state.currentUser = action.payload
            break;
        case 'IS_ADVERTISER':
            state.isAdvertiser = action.payload
            break;
        case 'IS_USER':
            state.isUser = action.payload
            break;
        case 'SET_TOKEN':
                state.token = action.payload
                break;
        default:
            break;
    }

}, initialState)

//יצירת המחסן - מקבל את הרדיוסר
const store = createStore(reducer)
window.store = store;
export default store;