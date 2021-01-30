import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from '../_actions/types';



function loginAPI(data){
    return axios.post('/user/login',data);
}

function registerAPI(data){
    return axios.post('/user/register',data);
}

function* login(action){
    try{
        const result = yield call(loginAPI,action.data);
            yield put({
                type: LOG_IN_SUCCESS,
                data: result.data
            });
    }catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        });
    }
}

function* register(action){
    try{
        yield call(registerAPI,action.data);
        yield put({
            type:REGISTER_SUCCESS
        });
    }catch(err){
        yield put({
            type:REGISTER_FAILURE,
            error:err.response.data
        });
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST,login);
}

function* watchRegister(){
    yield takeLatest(REGISTER_REQUEST,register);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchRegister)
    ]);
}