import axios from 'axios';
import { call, put, takeLatest,all,fork } from 'redux-saga/effects';
import { DEVICE_ADD_FAILURE, DEVICE_ADD_REQUEST, DEVICE_ADD_SUCCESS } from '../_actions/types';

function addDeviceAPI(data){
    return axios.post('/device/add',data);
}

function* addDevice(action){
    try{
        const result = yield call(addDeviceAPI,action.data);
        yield put({
            type: DEVICE_ADD_SUCCESS,
            data: result.data.alreadyDevice
        });
    }catch(err){
        yield put({
            type:DEVICE_ADD_FAILURE
        })
    }
}

function* watchAddDevice(){
    yield takeLatest(DEVICE_ADD_REQUEST,addDevice);
}

export default function* deviceSaga(){
    yield all([
        fork(watchAddDevice)
    ]);
}