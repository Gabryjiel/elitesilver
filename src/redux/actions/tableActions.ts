import * as TYPES from '../types';

export const setHeaders = (headers: Array<any>) => ({
    type: TYPES.TABLE_SET_HEADERS,
    payload: headers
});

export const setRows = (rows: Array<any>) => ({
    type: TYPES.TABLE_SET_ROWS,
    payload: rows
});

export const setTable = (data: any) => ({
    type: TYPES.TABLE_SET_TABLE,
    payload: data
})