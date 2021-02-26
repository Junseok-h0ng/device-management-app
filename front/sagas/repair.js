import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import { REPAIR_ADD_FAILURE, REPAIR_ADD_REQUEST, REPAIR_ADD_SUCCESS } from '../_actions/types';

function addRepairAPI(data){
    return axios.post('/repair/add',data);
}

function* addRepair(action){
    try{
        yield call(addRepairAPI,action.data);
        yield put({
            type:REPAIR_ADD_SUCCESS 
        });
    }catch(err){
        yield put({
            type:REPAIR_ADD_FAILURE
        })
    }
}

function* watchAddRepair(){
    yield takeLatest(REPAIR_ADD_REQUEST,addRepair);
}

export default function* repairSaga(){
    yield all([
        fork(watchAddRepair)
    ]);
}