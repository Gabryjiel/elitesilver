import * as TYPES from '../types';

export const setTitle = (title: string) => ({
    type: TYPES.FOOTER_SET_TITLE,
    payload: title
});