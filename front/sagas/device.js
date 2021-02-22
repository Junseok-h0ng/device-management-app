import axios from 'axios';
import { call, put, takeLatest,all,fork } from 'redux-saga/effects';
import { DEVICE_ADD_FAILURE,DEVICE_ADD_REQUEST,DEVICE_ADD_SUCCESS,
    DEVICE_LIST_FAILURE,DEVICE_LIST_REQUEST,DEVICE_LIST_SUCCESS,
    DEVICE_EDIT_FAILURE,DEVICE_EDIT_REQUEST,DEVICE_EDIT_SUCCESS, DEVICE_LOCATION_ADD_REQUEST, DEVICE_LOCATION_ADD_SUCCESS, DEVICE_LOCATION_ADD_FAILURE, DEVICE_LOCATION_LOAD_REQUEST, DEVICE_LOCATION_LOAD_SUCCESS, DEVICE_LOCATION_LOAD_FAILURE } from '../_actions/types';

function addDeviceAPI(data){
    return axios.post('/device/add',data);
}
function deviceListAPI(data){
    return axios.post('/device',data);
}
function editDeviceAPI(data){
    return axios.post('/device/edit',data);
}
function addLocationAPI(data){
    return axios.post('/device/location/add',data);
}
function loadLocationAPI(data){
    return axios.post('/device/location/load',data);
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

function* editDevice(action){
    try{
        yield call(editDeviceAPI,action.data);
        yield put({
            type:DEVICE_EDIT_SUCCESS
        })
    }catch(err){
        yield put({
            type:DEVICE_EDIT_FAILURE
        })
    }
}

function* addLocation(action){
    try{
        yield call(addLocationAPI,action.data);
        yield put({
            type:DEVICE_LOCATION_ADD_SUCCESS
        })
    }catch(err){
        yield put({
            type:DEVICE_LOCATION_ADD_FAILURE
        })
    }
}

function* loadLocation(action){
    try{
        const result = yield call(loadLocationAPI,action.data);
        yield put({
            type:DEVICE_LOCATION_LOAD_SUCCESS,
            data:result.data.location
        });
    }catch(err){
        yield put({
            type:DEVICE_LOCATION_LOAD_FAILURE
        });
    }
}

function* watchAddDevice(){
    yield takeLatest(DEVICE_ADD_REQUEST,addDevice);
}
function* watchDeviceList(){
    yield takeLatest(DEVICE_LIST_REQUEST,deviceList);
}
function* watchEditDevice(){
    yield takeLatest(DEVICE_EDIT_REQUEST,editDevice);
}
function* watchAddLocation(){
    yield takeLatest(DEVICE_LOCATION_ADD_REQUEST,addLocation);
}
function* watchLoadLocation(){
    yield takeLatest(DEVICE_LOCATION_LOAD_REQUEST,loadLocation);
}

export default function* deviceSaga(){
    yield all([
        fork(watchAddDevice),
        fork(watchDeviceList),
        fork(watchEditDevice),
        fork(watchAddLocation),
        fork(watchLoadLocation)
    ]);
}