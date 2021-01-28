import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import { LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS } from '../_actions/types';

function logInAPI(data){
    return axios.post('http://localhost:8080/user/login',data);
}

function* logIn(action){
    try{
        const result = yield call(logInAPI,action.data);
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

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST,logIn);
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
    ]);
}