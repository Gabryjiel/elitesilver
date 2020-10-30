import * as TYPES from '../types';

const initialState = {
    title: {content: '', href: ''},
    subtitle: {content: '', href: ''},
    description: {content: '', href: ''},
    image: 'https://tinyurl.com/y4qwtnca',
    tabs: [
        {content: '', hef: ''}
    ]
};

export default function main(state = initialState, action: ActionType){
    switch(action.type){
        case TYPES.FOOTER_SET_TITLE:
            return { ...state, title: action.payload};
        case TYPES.FOOTER_SET_SUBTITLE:
            return { ...state, subtitle: action.payload};
        case TYPES.FOOTER_SET_DESCRIPTION:
            return { ...state, description: action.payload};
        case TYPES.FOOTER_SET_TABS:
            return { ...state, tabs: action.payload};
        default:
            return {...state};
    }
};

type ActionType = {
    type: string,
    payload: any
}