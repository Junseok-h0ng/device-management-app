import {
    DEVICE_ADD_REQUEST, DEVICE_LIST_REQUEST
} from './types'

export const addDeviceAction = (data) =>({
    type:DEVICE_ADD_REQUEST,
    data
});

export const deviceListAction = (data) => ({
    type: DEVICE_LIST_REQUEST,
    data
})