import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS, GROUPS_LOAD_FAILURE, GROUPS_LOAD_REQUEST, GROUPS_LOAD_SUCCESS, RESET_GROUP_STATUS, GROUP_CONNECTED_STATUS, GROUP_JOIN_REQUEST, GROUP_JOIN_SUCCESS, GROUP_JOIN_FAILURE, GROUP_LOAD_JOIN_REQUEST, GROUP_LOAD_JOIN_SUCCESS,GROUP_LOAD_JOIN_FAILURE, GROUP_ACCESS_JOIN_REQUEST, GROUP_ACCESS_JOIN_SUCCESS, GROUP_ACCESS_JOIN_FAILURE, RESET_ERROR_MESSAGE } from "../_actions/types";


export const initialState={
    history: null,
    connected:null,
    join:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case GROUP_CREATE_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUP_CREATE_SUCCESS:
            return{
                ...state,
                history:action.data,
                isLoading:false
            }
        case GROUP_CREATE_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_JOIN_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUP_JOIN_SUCCESS:
            return{
                ...state,
                error: action.error,
                history: action.history,
                isLoading:false
            }
        case GROUP_JOIN_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case GROUPS_LOAD_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUPS_LOAD_SUCCESS:
            return{
                ...state,
                data:action.data,
                isLoading:false
            }
        case GROUPS_LOAD_FAILURE:
            return{
                ...state,
                data:action.data,
                isLoading:false
            }
        case GROUP_LOAD_JOIN_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUP_LOAD_JOIN_SUCCESS:
            return{
                ...state,
                join:action.data,
                isLoading:false
            }
        case GROUP_LOAD_JOIN_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_ACCESS_JOIN_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUP_ACCESS_JOIN_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_ACCESS_JOIN_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case RESET_GROUP_STATUS:
            return{
                ...state,
                error:null,
                history:null,
                connected:null
            }
        case GROUP_CONNECTED_STATUS:
            return{
                ...state,
                connected:action.data
            }
        default:
            return{
                ...state
            }
    }
}