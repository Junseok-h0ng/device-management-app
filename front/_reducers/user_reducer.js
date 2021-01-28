import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    REGISTER_USER
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
                isLogin: action.data.isLogin,
                data:action.data
            }
        }
        case LOG_IN_FAILURE:{
            return{
                ...state,
                data:action.data
            }
        }
        case REGISTER_USER:
            return
        default:
            return {
                ...state
            }
    }
}