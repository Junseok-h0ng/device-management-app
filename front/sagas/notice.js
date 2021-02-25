import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import {NOTICE_ADD_REQUEST,NOTICE_ADD_SUCCESS,NOTICE_ADD_FAILURE, NOTICE_LOAD_REQUEST, NOTICE_LOAD_SUCCESS, NOTICE_LOAD_FAILURE, NOTICE_INFO_REQUEST, NOTICE_EDIT_REQEUST, NOTICE_INFO_SUCCESS, NOTICE_INFO_FAILURE, NOTICE_EDIT_SUCCESS, NOTICE_EDIT_FAILURE} from '../_actions/types';

function addNoticeAPI(data){
    return axios.post('/notice/add',data);
}

function loadNoticeAPI(data){
    return axios.post('/notice/load',data);
}

function infoNoticeAPI(data){
    return axios.post('/notice/info',data);
}

function editNoticeAPI(data){
    return axios.post('/notice/edit',data);
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
function* infoNotice(action){
    try{
        const result = yield call(infoNoticeAPI,action.data);
        console.log(result);
        yield put({
            type:NOTICE_INFO_SUCCESS,
            data:result.data.noticeInfo
        });
    }catch(err){
        yield put({
            type:NOTICE_INFO_FAILURE
        })
    }
}
function* editNotice(action){
    try{
        yield call(editNoticeAPI,action.data);
        yield put({
            type:NOTICE_EDIT_SUCCESS
        });
    }catch(err){
        yield put({
            type:NOTICE_EDIT_FAILURE
        })
    }
}

function* watchAddNotice(){
    yield takeLatest(NOTICE_ADD_REQUEST,addNotice);
}
function* watchLoadNotice(){
    yield takeLatest(NOTICE_LOAD_REQUEST,loadNotice);
}
function* watchInfoNotice(){
    yield takeLatest(NOTICE_INFO_REQUEST,infoNotice);
}
function* watchEditNotice(){
    yield takeLatest(NOTICE_EDIT_REQEUST,editNotice);
}

export default function* noticeSaga(){
    yield all([
        fork(watchAddNotice),
        fork(watchLoadNotice),
        fork(watchInfoNotice),
        fork(watchEditNotice)
    ]);
}