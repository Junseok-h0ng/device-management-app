import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS, GROUPS_LOAD_FAILURE, GROUPS_LOAD_REQUEST, GROUPS_LOAD_SUCCESS } from "../_actions/types";


export const initialState={

}

export default function(state=initialState,action){
    switch(action.type){
        case GROUP_CREATE_REQUEST:
            return{
                ...state
            }
        case GROUP_CREATE_SUCCESS:
            return{
                ...state
            }
        case GROUP_CREATE_FAILURE:
            return{
                ...state
            }
        case GROUPS_LOAD_REQUEST:
            return{
                ...state
            }
        case GROUPS_LOAD_SUCCESS:
            return{
                ...state,
                data:action.data
            }
        case GROUPS_LOAD_FAILURE:
            return{
                ...state
            }
        default:
            return{
                ...state
            }
    }
}