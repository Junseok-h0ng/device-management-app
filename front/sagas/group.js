import axios from "axios";
import { all, fork, put, takeLatest,call, getContext} from "redux-saga/effects";
import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS, GROUPS_LOAD_REQUEST, GROUPS_LOAD_SUCCESS, GROUPS_LOAD_FAILURE } from "../_actions/types";

function createGroupAPI(data){
    return axios.post('/group/create',data);
}

function loadGroupsAPI(data){
    return axios.post('/group',data);
}

function* createGroup(action){
    try{
        const result = yield call(createGroupAPI,action.data);
        console.log(result);
        yield put({
            type:GROUP_CREATE_SUCCESS,
            history:result.data.history
        })
    }catch(err){
        yield put({
            type:GROUP_CREATE_FAILURE
        })
    }
}

function* loadGroups(action){
    try{
        const result = yield call(loadGroupsAPI,action.data);
        yield put({
            type:GROUPS_LOAD_SUCCESS,
            data: result.data
        });
    }catch(err){
        yield put({
            type:GROUPS_LOAD_FAILURE
        })
    }
}



function* watchCreateGroup(){
    yield takeLatest(GROUP_CREATE_REQUEST,createGroup);
}
function* watchLoadGroups(){
    yield takeLatest(GROUPS_LOAD_REQUEST,loadGroups);
}

export default function* groupSaga(){
    yield all([
        fork(watchCreateGroup),
        fork(watchLoadGroups)
    ])
}