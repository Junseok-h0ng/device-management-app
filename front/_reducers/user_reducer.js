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
    USER_ROLE_FAILURE,
    USER_ROLE_SUCCESS,
    USER_ROLE_REQUEST,
    USER_STATUS_FAILURE,
    USER_STATUS_REQUEST,
    USER_STATUS_SUCCESS
} from '../_actions/types';

export const initialState = {
        isLogin:false,
        error:false,
        isLoading:false,
        requestSuccess:null,
        role:null
}

export default function (state=initialState, action){
   
    switch(action.type){
        case LOG_IN_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case LOG_IN_SUCCESS:{
            return{
                ...state,
                isLogin: true,
                isLoading:false,
                data:action.data
            }
        }
        case LOG_IN_FAILURE:{
            return{
                ...state,
                isLoading:false,
                error:action.message
            }
        }
        case LOG_OUT_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                isLogin:false,
                isLoading:false,
                data:action.data
            }
        case LOG_OUT_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case REGISTER_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isLoading:false,
                requestSuccess:true
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.message
            }
        case USER_STATUS_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case USER_STATUS_SUCCESS:
            return{
                ...state,
                isLogin:true,
                isLoading:false,
                data:action.data
            }
        case USER_STATUS_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case RESET_ERROR_MESSAGE:
            return{
                ...state,
                error:false,
                requestSuccess:null
            }
        case USER_ROLE_REQUEST:
            return{
                ...state,
            }
        case USER_ROLE_SUCCESS:
            return{
                ...state,
                role:action.data
            }
        case USER_ROLE_FAILURE:
            return{
                ...state
            }
        default:
            return {
                ...state
            }
    }
}