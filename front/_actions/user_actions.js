import {
    LOG_IN_REQUEST,
    LOG_OUT_REQUEST,
    REGISTER_REQUEST,
    RESET_ERROR_MESSAGE,
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

export const resetErrorMessage = () =>({
    type: RESET_ERROR_MESSAGE
})