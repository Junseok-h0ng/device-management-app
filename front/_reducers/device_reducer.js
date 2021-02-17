import { DEVICE_ADD_FAILURE, DEVICE_ADD_REQUEST, DEVICE_ADD_SUCCESS } from "../_actions/types";

export const initialState = {
    isLoading:false
}

export default function(state=initialState,action){
    switch(action){
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
        default:
            return{
                ...state
            }
    }
}