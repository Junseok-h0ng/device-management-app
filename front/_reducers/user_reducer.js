import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_ERROR_MESSAGE,
    USER_STATUS_FAILURE,
    USER_STATUS_REQUEST,
    USER_STATUS_SUCCESS
} from '../_actions/types';

export const initialState = {
        isLogin:false,
        error:false
}

export default function (state=initialState, action){
   
    switch(action.type){
        case LOG_IN_REQUEST:
            return{
                ...state,
            }
        case LOG_IN_SUCCESS:{
            return{
                ...state,
                isLogin: true,
                data:action.data
            }
        }
        case LOG_IN_FAILURE:{
            return{
                ...state,
                error:action.message,
            }
        }
        case LOG_OUT_REQUEST:
            return{
                ...state
            }
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                isLogin:false,
                data:action.data
            }
        case LOG_OUT_FAILURE:
            return{
                ...state
            }
        case REGISTER_REQUEST:
            return{
                ...state
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                requestSuccess:true
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                error:action.message
            }
        case USER_STATUS_REQUEST:
            return{
                ...state
            }
        case USER_STATUS_SUCCESS:
            return{
                ...state,
                isLogin:true,
                data:action.data
            }
        case USER_STATUS_FAILURE:
            return{
                ...state
            }
        case RESET_ERROR_MESSAGE:
            return{
                ...state,
                error:false
            }
        default:
            return {
                ...state
            }
    }
}