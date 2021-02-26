import {combineReducers} from 'redux';

import user from './user_reducer';
import group from './group_reducer';
import device from './device_reducer';
import notice from './notice_reducer';
import repair from './repair_reducer';

const rootReducer = combineReducers({
    user,
    group,
    device,
    notice,
    repair
})

export default rootReducer;