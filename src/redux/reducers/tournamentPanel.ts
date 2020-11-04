import * as TYPES from '../types';

const initialState = {
    image: 'https://i.redd.it/is8khj2rkcn51.jpg',
    title: '',
    firstPlace: '',
    secondPlace: '',
    thirdPlace: ''
};

export default function reducer(state = initialState, action: ActionType){
    switch(action.type){
        case TYPES.TOURNAMENT_PANEL_SET_IMAGE:
            return { ...state, image: action.payload};
        case TYPES.TOURNAMENT_PANEL_SET_TITLE:
            return { ...state, title: action.payload};
        case TYPES.TOURNAMENT_PANEL_SET_FIRST_PLACE:
            return { ...state, firstPlace: action.payload};
        case TYPES.TOURNAMENT_PANEL_SET_SECOND_PLACE:
            return { ...state, secondPlace: action.payload};
        case TYPES.TOURNAMENT_PANEL_SET_THIRD_PLACE:
            return { ...state, thirdPlace: action.payload};
        default:
            return {...state};
    }
};

type ActionType = {
    type: string,
    payload: any
}