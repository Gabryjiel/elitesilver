import * as TYPES from '../types';

const initialState: Table = {
    headers: [],
    rows: []
};

export default function main(state = initialState, action: ActionType){
    switch(action.type){
        case TYPES.TABLE_SET_HEADERS:
            return { ...state, headers: action.payload};
        case TYPES.TABLE_SET_ROWS:
            return { ...state, rows: action.payload};
        case TYPES.TABLE_SET_TABLE:
            return {...state, ...action.payload};
        default:
            return {...state};
    }
};

type ActionType = {
    type: string,
    payload: any
}

type Table = {
    headers: Array<string>,
    rows: Array<Row>
}

type Row = {
    row: Array<any>
}