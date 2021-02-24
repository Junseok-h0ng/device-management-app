import {combineReducers} from 'redux';
import user from './user_reducer'
import group from './group_reducer'
import device from './device_reducer'
import notice from './notice_reducer'

const rootReducer = combineReducers({
    user,
    group,
    device,
    notice
})

export default rootReducer;