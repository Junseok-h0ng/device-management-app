import axios from "axios";
import { all, fork, put, takeLatest,call} from "redux-saga/effects";
import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS, GROUPS_LOAD_REQUEST, GROUPS_LOAD_SUCCESS, GROUPS_LOAD_FAILURE, GROUP_JOIN_REQUEST, GROUP_JOIN_SUCCESS, GROUP_JOIN_FAILURE, GROUP_LOAD_JOIN_REQUEST, GROUP_LOAD_JOIN_SUCCESS, GROUP_LOAD_JOIN_FAILURE, GROUP_ACCESS_JOIN_REQUEST, GROUP_ACCESS_JOIN_SUCCESS, GROUP_ACCESS_JOIN_FAILURE, GROUP_REJECT_JOIN_REQUEST, GROUP_REJECT_JOIN_SUCCESS, GROUP_REJECT_JOIN_FAILURE, USER_STATUS_REQUEST, GROUP_ROLE_INCREASE_REQUEST, GROUP_ROLE_DECREASE_REQUEST, GROUP_ROLE_INCREASE_FAILURE, GROUP_ROLE_INCREASE_SUCCESS, GROUP_ROLE_DECREASE_SUCCESS, GROUP_ROLE_DECREASE_FAILURE, GROUP_DELETE_REQUEST, GROUP_DELETE_SUCCESS, GROUP_DELETE_FAILURE } from "../_actions/types";

function createGroupAPI(data){
    return axios.post('/group/create',data);
}

function joinGroupAPI(data){
    return axios.post('/group/join',data);
}

function loadJoinGroupAPI(data){
    return axios.post('/group/loadJoin',data);
}

function accessJoinGroupAPI(data){
    return axios.post('/group/accessJoin',data);
}

function rejectJoinGroupAPI(data){
    return axios.post('/group/rejectJoin',data);
}
function increaseRoleGroupAPI(data){
    return axios.post('/group/increaseRole',data);
}
function decreaseRoleGroupAPI(data){
    return axios.post('/group/decreaseRole',data);
}

function loadGroupsAPI(data){
    return axios.post('/group',data);
}

function deleteGroupAPI(data){
    return axios.post('/group/delete',data);
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
        yield put({
            type:GROUP_JOIN_SUCCESS,
            error:result.data.message,
            history:result.data.history
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
            data: {
                join: result.data.join,
                members: result.data.members,
                admins:result.data.admins
            }
        });
    }catch(err){
        yield put({
            type:GROUP_LOAD_JOIN_FAILURE
        })
    }
}

function* accessJoinGroup(action){
    try{
        yield call(accessJoinGroupAPI,action.data);
        yield put({
            type: GROUP_ACCESS_JOIN_SUCCESS
        });
    }catch(err){
        yield put({
            type:GROUP_ACCESS_JOIN_FAILURE
        });
    }
}

function* rejectJoinGroup(action){
    try{
        yield call(rejectJoinGroupAPI,action.data);
        yield put({
            type:GROUP_REJECT_JOIN_SUCCESS
        })
    }catch(err){
        yield put({
            type:GROUP_REJECT_JOIN_FAILURE
        })
    }
}
function* increaseRoleGroup(action){
    try{
        yield call(increaseRoleGroupAPI,action.data);
        yield put({
            type:GROUP_ROLE_INCREASE_SUCCESS
        });
    }catch(err){
        yield put({
            type:GROUP_ROLE_INCREASE_FAILURE
        });
    }
}
function* decreaseRoleGroup(action){
    try{
        yield call(decreaseRoleGroupAPI,action.data);
        yield put({
            type:GROUP_ROLE_DECREASE_SUCCESS
        });
    }catch(err){
        yield put({
            type:GROUP_ROLE_DECREASE_FAILURE
        });
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
        });
    }
}

function* deleteGroup(action){
    try{
        yield call(deleteGroupAPI,action.data);
        yield put({
            type:GROUP_DELETE_SUCCESS
        });
    }catch(err){
        yield put({
            type:GROUP_DELETE_FAILURE
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
function* watchAccessJoinGroup(){
    yield takeLatest(GROUP_ACCESS_JOIN_REQUEST,accessJoinGroup);
}
function* watchRejectJoinGroup(){
    yield takeLatest(GROUP_REJECT_JOIN_REQUEST,rejectJoinGroup);
}
function* watchIncreaseRoleGroup(){
    yield takeLatest(GROUP_ROLE_INCREASE_REQUEST,increaseRoleGroup);
}
function* watchDecreaseRoleGroup(){
    yield takeLatest(GROUP_ROLE_DECREASE_REQUEST,decreaseRoleGroup);
}

function* watchLoadGroups(){
    yield takeLatest(GROUPS_LOAD_REQUEST,loadGroups);
}

function* watchDeleteGroup(){
    yield takeLatest(GROUP_DELETE_REQUEST,deleteGroup);
}

export default function* groupSaga(){
    yield all([
        fork(watchCreateGroup),
        fork(watchJoinGroup),
        fork(watchLoadGroups),
        fork(watchLoadJoinGroup),
        fork(watchAccessJoinGroup),
        fork(watchRejectJoinGroup),
        fork(watchIncreaseRoleGroup),
        fork(watchDecreaseRoleGroup),
        fork(watchDeleteGroup)
    ])
}