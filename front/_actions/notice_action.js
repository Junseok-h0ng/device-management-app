import {
    NOTICE_ADD_REQUEST
} from './types'

export const addNoticeAction = (data) => ({
    type:NOTICE_ADD_REQUEST,
    data
});