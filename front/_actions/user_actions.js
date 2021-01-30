import {
    LOG_IN_REQUEST,
    REGISTER_REQUEST
} from './types'

export const loginRequestAction = (data) =>({
    type: LOG_IN_REQUEST,
    data
});

export const registerRequestAction = (data) =>({
    type: REGISTER_REQUEST,
    data
})