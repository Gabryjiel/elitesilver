import * as TYPES from '../types';

export const setImagePath = (imagePath: string) => ({
    type: TYPES.TOURNAMENT_PANEL_SET_IMAGE,
    payload: imagePath
});

export const setTitle = (title: string) => ({
    type: TYPES.TOURNAMENT_PANEL_SET_TITLE,
    payload: title
});

export const setFirstPlace = (firstPlace: string) => ({
    type: TYPES.TOURNAMENT_PANEL_SET_FIRST_PLACE,
    payload: firstPlace
});

export const setSecondPlace = (secondPlace: string) => ({
    type: TYPES.TOURNAMENT_PANEL_SET_SECOND_PLACE,
    payload: secondPlace
});

export const setThirdPlace = (thirdPlace: string) => ({
    type: TYPES.TOURNAMENT_PANEL_SET_THIRD_PLACE,
    payload: thirdPlace
});

export const setTournamentPanel = (data: any) => ({
    type: TYPES.TOURNAMENT_PANEL_SET_TOURNAMENT_PANEL,
    payload: data
})