import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import {NOTICE_ADD_REQUEST,NOTICE_ADD_SUCCESS,NOTICE_ADD_FAILURE} from '../_actions/types';

function addNoticeAPI(data){
    return axios.post('/notice/add',data);
}

function* addNotice(action){
    try{
        yield call(addNoticeAPI,action.data);
        yield put({
            type:NOTICE_ADD_SUCCESS
        });    
    }catch(err){
        yield put({
            type:NOTICE_ADD_FAILURE
        })
    }
}

function* watchAddNotice(){
    yield takeLatest(NOTICE_ADD_REQUEST,addNotice)
}

export default function* noticeSaga(){
    yield all([
        fork(watchAddNotice)
    ]);
}