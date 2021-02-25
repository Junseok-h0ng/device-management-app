import {
    NOTICE_ADD_REQUEST, NOTICE_EDIT_REQEUST, NOTICE_INFO_REQUEST, NOTICE_LOAD_REQUEST, NOTICE_RESET_INFO
} from './types'

export const addNoticeAction = (data) => ({
    type:NOTICE_ADD_REQUEST,
    data
});

export const loadNoticeAction = (data) => ({
    type:NOTICE_LOAD_REQUEST,
    data
});

export const loadInfoNoticeAction = (data) => ({
    type:NOTICE_INFO_REQUEST,
    data
});

export const editNoticeAction = (data) => ({
    type:NOTICE_EDIT_REQEUST,
    data
});

export const resetNoticeInfoAction = (data) => ({
    type:NOTICE_RESET_INFO
})