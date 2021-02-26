import { REPAIR_ADD_FAILURE, REPAIR_ADD_REQUEST, REPAIR_ADD_SUCCESS } from '../_actions/types'

export const initialState = {
    info:null
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
        default:
            return{
                ...state
            }
    }
}