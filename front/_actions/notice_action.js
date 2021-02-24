import {
    NOTICE_ADD_REQUEST, NOTICE_LOAD_REQUEST
} from './types'

export const addNoticeAction = (data) => ({
    type:NOTICE_ADD_REQUEST,
    data
});

export const loadNoticeAction = (data) => ({
    type:NOTICE_LOAD_REQUEST,
    data
})