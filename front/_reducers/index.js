import {combineReducers} from 'redux';
import user from './user_reducer'
import group from './group_reducer'

const rootReducer = combineReducers({
    user,
    group
})

export default rootReducer;