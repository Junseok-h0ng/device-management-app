import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS, 
    GROUPS_LOAD_FAILURE, GROUPS_LOAD_REQUEST, GROUPS_LOAD_SUCCESS, 
    RESET_GROUP_STATUS, GROUP_CONNECTED_STATUS,
    GROUP_JOIN_REQUEST, GROUP_JOIN_SUCCESS, GROUP_JOIN_FAILURE, 
    GROUP_LOAD_JOIN_REQUEST, GROUP_LOAD_JOIN_SUCCESS,GROUP_LOAD_JOIN_FAILURE, 
    GROUP_ACCESS_JOIN_REQUEST, GROUP_ACCESS_JOIN_SUCCESS, GROUP_ACCESS_JOIN_FAILURE,
    GROUP_REJECT_JOIN_REQUEST,GROUP_REJECT_JOIN_SUCCESS,GROUP_REJECT_JOIN_FAILURE, GROUP_ROLE_INCREASE_REQUEST, GROUP_ROLE_INCREASE_SUCCESS, GROUP_ROLE_INCREASE_FAILURE, GROUP_ROLE_DECREASE_REQUEST, GROUP_ROLE_DECREASE_SUCCESS, GROUP_ROLE_DECREASE_FAILURE } from "../_actions/types";


export const initialState={
    history: null,
    connected:null,
    join:[],
    members:[],
    admins:[]
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
                isLoading:false,
                
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
                join:action.data.join,
                members:action.data.members,
                admins:action.data.admins,
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
        case GROUP_REJECT_JOIN_REQUEST:
            return{
                ...state,
                isLoding:true
            }
        case GROUP_REJECT_JOIN_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_REJECT_JOIN_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_ROLE_INCREASE_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUP_ROLE_INCREASE_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_ROLE_INCREASE_FAILURE:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_ROLE_DECREASE_REQUEST:
            return{
                ...state,
                isLoading:true
            }
        case GROUP_ROLE_DECREASE_SUCCESS:
            return{
                ...state,
                isLoading:false
            }
        case GROUP_ROLE_DECREASE_FAILURE:
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