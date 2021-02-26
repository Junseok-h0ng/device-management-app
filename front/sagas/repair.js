import axios from 'axios';
import{all,fork,call,put,takeLatest} from 'redux-saga/effects'
import { REPAIR_ADD_FAILURE, REPAIR_ADD_REQUEST, REPAIR_ADD_SUCCESS, REPAIR_LOAD_FAILURE, REPAIR_LOAD_REQUEST, REPAIR_LOAD_SUCCESS } from '../_actions/types';

function addRepairAPI(data){
    return axios.post('/repair/add',data);
}

function loadRepairAPI(data){
    return axios.post('/repair/load',data);
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

function* loadRepair(action){
    try{
      const result = yield call(loadRepairAPI,action.data);
      yield put({
          type:REPAIR_LOAD_SUCCESS,
          data:result.data.list
      })
    }catch(err){
        yield put({
            type:REPAIR_LOAD_FAILURE
        })
    }
}

function* watchAddRepair(){
    yield takeLatest(REPAIR_ADD_REQUEST,addRepair);
}
function* watchLoadRepair(){
    yield takeLatest(REPAIR_LOAD_REQUEST,loadRepair);
}

export default function* repairSaga(){
    yield all([
        fork(watchAddRepair),
        fork(watchLoadRepair)
    ]);
}