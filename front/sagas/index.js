import axios from 'axios';
import {all,fork} from 'redux-saga/effects';

import userSaga from './user';
import groupSaga from './group';
import deviceSaga from './device';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export default function* rootSaga(){
    yield all([
        fork(userSaga),
        fork(groupSaga),
        fork(deviceSaga)
    ])
}