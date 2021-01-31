import {
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    REGISTER_REQUEST,
    USER_STATUS_REQUEST
} from './types'

export const loginRequestAction = (data) =>({
    type: LOG_IN_REQUEST,
    data
});

export const registerRequestAction = (data) =>({
    type: REGISTER_REQUEST,
    data
});

export const logoutRequestAction = () =>({
    type: LOG_OUT_REQUEST
});

export const userStatusRequestAction = () =>({
    type: USER_STATUS_REQUEST
})