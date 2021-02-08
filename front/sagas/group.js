import axios from "axios";
import { all, fork, put, takeLatest,call, getContext} from "redux-saga/effects";
import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS, GROUPS_LOAD_REQUEST, GROUPS_LOAD_SUCCESS, GROUPS_LOAD_FAILURE, GROUP_JOIN_REQUEST, GROUP_JOIN_SUCCESS, GROUP_JOIN_FAILURE, GROUP_LOAD_JOIN_REQUEST, GROUP_LOAD_JOIN_SUCCESS, GROUP_LOAD_JOIN_FAILURE } from "../_actions/types";

function createGroupAPI(data){
    return axios.post('/group/create',data);
}

function joinGroupAPI(data){
    return axios.post('/group/join',data);
}

function loadJoinGroupAPI(data){
    return axios.post('/group/joined',data);
}

function loadGroupsAPI(data){
    return axios.post('/group',data);
}

function* createGroup(action){
    try{
        const result = yield call(createGroupAPI,action.data);
        yield put({
            type:GROUP_CREATE_SUCCESS,
            data:result.data.history
        });
    }catch(err){
        yield put({
            type:GROUP_CREATE_FAILURE
        });
    }
}

function* joinGroup(action){
    try{
        const result = yield call(joinGroupAPI,action.data);
        console.log(result);
        yield put({
            type:GROUP_JOIN_SUCCESS,
            data:result.data.message
        });
    }catch(err){
        yield put({
            type:GROUP_JOIN_FAILURE
        })
    }
}

function* loadJoinGroup(action){
    try{
        const result = yield call(loadJoinGroupAPI,action.data);
        yield put({
            type:GROUP_LOAD_JOIN_SUCCESS,
            data: result.data.users
        });
    }catch(err){
        yield(put({
            type:GROUP_LOAD_JOIN_FAILURE
        }))
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

function* watchJoinGroup(){
    yield takeLatest(GROUP_JOIN_REQUEST,joinGroup);
}

function* watchLoadJoinGroup(){
    yield takeLatest(GROUP_LOAD_JOIN_REQUEST,loadJoinGroup);
}

function* watchLoadGroups(){
    yield takeLatest(GROUPS_LOAD_REQUEST,loadGroups);
}

export default function* groupSaga(){
    yield all([
        fork(watchCreateGroup),
        fork(watchJoinGroup),
        fork(watchLoadGroups),
        fork(watchLoadJoinGroup)
    ])
}