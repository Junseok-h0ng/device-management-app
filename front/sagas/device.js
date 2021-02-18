import axios from 'axios';
import { call, put, takeLatest,all,fork } from 'redux-saga/effects';
import { DEVICE_ADD_FAILURE, DEVICE_ADD_REQUEST, DEVICE_ADD_SUCCESS, DEVICE_LIST_FAILURE, DEVICE_LIST_REQUEST, DEVICE_LIST_SUCCESS } from '../_actions/types';

function addDeviceAPI(data){
    return axios.post('/device/add',data);
}
function deviceListAPI(data){
    return axios.post('/device',data);
}

function* addDevice(action){
    try{
        yield call(addDeviceAPI,action.data);
        yield put({
            type: DEVICE_ADD_SUCCESS
        });
    }catch(err){
        yield put({
            type:DEVICE_ADD_FAILURE
        })
    }
}

function* deviceList(action){
    try{
        const result = yield call(deviceListAPI,action.data);
        yield put({
            type: DEVICE_LIST_SUCCESS,
            data: result.data.deviceList
        })
    }catch(err){
        yield put({
            type:DEVICE_LIST_FAILURE
        })
    }
}

function* watchAddDevice(){
    yield takeLatest(DEVICE_ADD_REQUEST,addDevice);
}
function* watchDeviceList(){
    yield takeLatest(DEVICE_LIST_REQUEST,deviceList)
}

export default function* deviceSaga(){
    yield all([
        fork(watchAddDevice),
        fork(watchDeviceList)
    ]);
}