import {NOTICE_ADD_REQUEST,NOTICE_ADD_SUCCESS,NOTICE_ADD_FAILURE, NOTICE_LOAD_REQUEST, NOTICE_LOAD_SUCCESS, NOTICE_LOAD_FAILURE, NOTICE_INFO_REQUEST, NOTICE_INFO_SUCCESS, NOTICE_INFO_FAILURE, NOTICE_EDIT_REQEUST, NOTICE_EDIT_SUCCESS, NOTICE_EDIT_FAILURE, NOTICE_RESET_INFO } from '../_actions/types'

export const initialState = {
    info:null
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
        case NOTICE_LOAD_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case NOTICE_LOAD_SUCCESS:
            return{
                ...state,
                isLoading:false,
                data:action.data
            }
        case NOTICE_LOAD_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case NOTICE_INFO_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case NOTICE_INFO_SUCCESS:
            return{
                ...state,
                isLoading:false,
                info:action.data
            }
        case NOTICE_INFO_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case NOTICE_EDIT_REQEUST:
            return{
                ...state,
                isLoading:true
            }
        case NOTICE_EDIT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                info:action.data
            }
        case NOTICE_EDIT_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case NOTICE_RESET_INFO:
            return{
                ...state,
                info:null
            }
        default:
            return{
                ...state
            }
    }
}