import { REPAIR_ADD_FAILURE, REPAIR_ADD_REQUEST, REPAIR_ADD_SUCCESS, REPAIR_COMPLETE_FAILURE, REPAIR_COMPLETE_REQUEST, REPAIR_COMPLETE_SUCCESS, REPAIR_LOAD_FAILURE, REPAIR_LOAD_REQUEST, REPAIR_LOAD_SUCCESS } from '../_actions/types'

export const initialState = {
    info:null,
    list:null
}

export default function(state=initialState,action){
    switch(action.type){
        case REPAIR_ADD_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case REPAIR_ADD_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case REPAIR_ADD_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case REPAIR_LOAD_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case REPAIR_LOAD_SUCCESS:
            return{
                ...state,
                list:action.data,
                isLoading:false
            }
        case REPAIR_LOAD_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case REPAIR_COMPLETE_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case REPAIR_COMPLETE_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case REPAIR_COMPLETE_FAILURE:
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