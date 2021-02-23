import {NOTICE_ADD_REQUEST,NOTICE_ADD_SUCCESS,NOTICE_ADD_FAILURE } from '../_actions/types'

export const initialState = {

}

export default function(state=initialState,action){
    switch(action.type){
        case NOTICE_ADD_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case NOTICE_ADD_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case NOTICE_ADD_FAILURE:
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