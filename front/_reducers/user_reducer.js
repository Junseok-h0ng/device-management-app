import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from '../_actions/types';

export const initialState = {
        isLogin:false
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
                data:action.data
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
                ...state
            }
        case REGISTER_FAILURE:
            return{
                ...state
            }
        default:
            return {
                ...state
            }
    }
}