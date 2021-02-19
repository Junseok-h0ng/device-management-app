import { DEVICE_ADD_FAILURE, DEVICE_ADD_REQUEST, DEVICE_ADD_SUCCESS, DEVICE_EDIT_REQUEST, DEVICE_EDIT_SUCCESS, DEVICE_EDIT_FAILURE, DEVICE_LIST_FAILURE, DEVICE_LIST_REQUEST, DEVICE_LIST_SUCCESS } from "../_actions/types";

export const initialState = {
    isLoading:false,
    deviceList:null
}

export default function(state=initialState,action){
    switch(action.type){
        case DEVICE_ADD_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case DEVICE_ADD_SUCCESS:
            return{
                ...state,
                isLoading:false,
                alreadyDevice:action.data
            }
        case DEVICE_ADD_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case DEVICE_LIST_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case DEVICE_LIST_SUCCESS:
            return{
                ...state,
                isLoading:false,
                deviceList:action.data
            }
        case DEVICE_LIST_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case DEVICE_EDIT_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case DEVICE_EDIT_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case DEVICE_EDIT_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        default:
            return{
                ...state
            }
    }
}