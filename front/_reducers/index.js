import {combineReducers} from 'redux';
import user from './user_reducer'
import group from './group_reducer'
import device from './device_reducer'

const rootReducer = combineReducers({
    user,
    group,
    device
})

export default rootReducer;