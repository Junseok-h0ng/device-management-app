import {
    DEVICE_ADD_REQUEST, DEVICE_EDIT_REQUEST, DEVICE_LIST_REQUEST, DEVICE_LOCATION_ADD_REQUEST
} from './types'

export const addDeviceAction = (data) =>({
    type:DEVICE_ADD_REQUEST,
    data
});

export const deviceListAction = (data) => ({
    type: DEVICE_LIST_REQUEST,
    data
});

export const editDeviceAction = (data) =>({
    type: DEVICE_EDIT_REQUEST,
    data
});

export const addLocationAction = (data) => ({
    type: DEVICE_LOCATION_ADD_REQUEST,
    data
})