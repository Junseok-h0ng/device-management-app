import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, 
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, 
    REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
    USER_LOAD_DATA_REQUEST,
    USER_LOAD_DATA_SUCCESS,
    USER_LOAD_DATA_FAILURE,
    USER_ROLE_FAILURE,
    USER_ROLE_REQUEST,
    USER_ROLE_SUCCESS,
    USER_STATUS_FAILURE, USER_STATUS_REQUEST, USER_STATUS_SUCCESS } from '../_actions/types';



function loginAPI(data){
    return axios.post('/user/login',data);
}
function logoutAPI(){
    return axios.post('/user/logout');
}

function registerAPI(data){
    return axios.post('/user/register',data);
}
function userStatusAPI(){
    return axios.post('/user');
}
function userLoadDataAPI(data){
    return axios.post('user/loadData',data)
}

function* login(action){
    try{
        const result = yield call(loginAPI,action.data);
        if(!result.data.error){
            yield put({
                type: LOG_IN_SUCCESS,
                data: result.data
            });
        }else{
            yield put({
                type: LOG_IN_FAILURE,
                message: result.data.message
            });
        }  
    }catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            error: err
        });
    }
}
function* logout(){
    try{
        yield call(logoutAPI)
        yield put({
            type:LOG_OUT_SUCCESS
        });
    }catch(err){
        yield put({
            type:LOG_OUT_FAILURE,
            error:err.response.data
        })
    }
}

function* register(action){
    try{
        const result = yield call(registerAPI,action.data);
        if(!result.data.error){
            yield put({
                type:REGISTER_SUCCESS
            }); 
        }else{
            yield put({
                type:REGISTER_FAILURE,
                message:result.data.message
            });
        }

    }catch(err){
        yield put({
            type:REGISTER_FAILURE,
            error:err.response.data
        });
    }
}
 function* userStatus(){
    try{
        const result = yield call(userStatusAPI)
        yield put({
            type:USER_STATUS_SUCCESS,
            data:result.data
        });
    }catch(err){
        yield put({
            type:USER_STATUS_FAILURE
        });
    }
}
function* userRole(action){
    try{
        yield put({
            type:USER_ROLE_SUCCESS,
            data:action.data
        });
    }catch(err){
        yield put({
            type:USER_ROLE_FAILURE
        })
    }
}
function* userLoadData(action){
    try{
        const result = yield call(userLoadDataAPI,action.data);
        yield put({
            type:USER_LOAD_DATA_SUCCESS,
            data:result.data
        });
    }catch(err){
        yield put({
            type:USER_LOAD_DATA_FAILURE
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST,login);
}
function* watchLogout(){
    yield takeLatest(LOG_OUT_REQUEST,logout);
}

function* watchRegister(){
    yield takeLatest(REGISTER_REQUEST,register);
}

function* watchUserStatus(){
    yield takeLatest(USER_STATUS_REQUEST,userStatus);
}
function* watchUserRole(){
    yield takeLatest(USER_ROLE_REQUEST,userRole);
}
function* watchUserLoadData(){
    yield takeLatest(USER_LOAD_DATA_REQUEST,userLoadData)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchRegister),
        fork(watchLogout),
        fork(watchUserStatus),
        fork(watchUserRole),
        fork(watchUserLoadData)
    ]);
}