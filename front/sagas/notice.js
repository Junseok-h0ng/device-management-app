import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import {NOTICE_ADD_REQUEST,NOTICE_ADD_SUCCESS,NOTICE_ADD_FAILURE, NOTICE_LOAD_REQUEST, NOTICE_LOAD_SUCCESS, NOTICE_LOAD_FAILURE} from '../_actions/types';

function addNoticeAPI(data){
    return axios.post('/notice/add',data);
}

function loadNoticeAPI(data){
    return axios.post('/notice/load',data);
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

function* loadNotice(action){
    try{
        const result = yield call(loadNoticeAPI,action.data);
        console.log(result);
        yield put({
            type:NOTICE_LOAD_SUCCESS,
            data:result.data.notice
        });
    }catch(err){
        yield put({
            type:NOTICE_LOAD_FAILURE
        })
    }
}

function* watchAddNotice(){
    yield takeLatest(NOTICE_ADD_REQUEST,addNotice);
}
function* watchLoadNotice(){
    yield takeLatest(NOTICE_LOAD_REQUEST,loadNotice);
}

export default function* noticeSaga(){
    yield all([
        fork(watchAddNotice),
        fork(watchLoadNotice)
    ]);
}