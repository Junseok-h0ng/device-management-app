import axios from "axios";
import { all, fork, put, takeLatest,call} from "redux-saga/effects";
import { GROUP_CREATE_FAILURE, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS } from "../_actions/types";

function createGroupAPI(data){
    console.log(data);
    return axios.post('/group/create',data);
}

function* createGroup(action){
    try{
        yield call(createGroupAPI,action.data);
        yield put({
            type:GROUP_CREATE_SUCCESS
        })
    }catch(err){
        yield put({
            type:GROUP_CREATE_FAILURE
        })
    }
}

function* watchCreateGroup(){
    yield takeLatest(GROUP_CREATE_REQUEST,createGroup);
}

export default function* groupSaga(){
    yield all([
        fork(watchCreateGroup)
    ])
}