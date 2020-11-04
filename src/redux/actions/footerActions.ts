import * as TYPES from '../types';

type ContentHref = {
    content: string,
    href?: string
};

export const setTitle = (title: ContentHref) => ({
    type: TYPES.FOOTER_SET_TITLE,
    payload: title
});

export const setSubtitle = (subtitle: ContentHref) => ({
    type: TYPES.FOOTER_SET_SUBTITLE,
    payload: subtitle
});

export const setDescription = (description: ContentHref) => ({
    type: TYPES.FOOTER_SET_DESCRIPTION,
    payload: description
});

export const setTabs = (tabs: Array<ContentHref>) => ({
    type: TYPES.FOOTER_SET_TABS,
    payload: tabs
});

export const setFooter = (data: any) => ({
    type: TYPES.FOOTER_SET_FOOTER,
    payload: data
})