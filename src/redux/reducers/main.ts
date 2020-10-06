import * as TYPES from '../types';

const main = (state = {
    footer: {
        title: "INITIALS",
        subtitle: "",
        description: ""
    }
}, action: ActionType) => {
    switch(action.type){
        case TYPES.FOOTER_SET_TITLE:
            return { ...state, footer: {...state.footer, title: action.payload}};
        default:
            return {...state};
    }
};

export default main;

type ActionType = {
    type: string,
    payload: any
}