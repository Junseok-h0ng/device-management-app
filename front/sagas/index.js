import axios from 'axios';
import {all,fork} from 'redux-saga/effects';

import userSaga from './user';
import groupSaga from './group';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

export default function* rootSaga(){
    yield all([
        fork(userSaga),
        fork(groupSaga)
    ])
}