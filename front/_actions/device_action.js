import {
    DEVICE_ADD_REQUEST,DEVICE_ADD_SUCCESS,DEVICE_ADD_FAILURE
} from './types'

export const addDeviceAction = (data) =>({
    type:DEVICE_ADD_REQUEST,
    data
});