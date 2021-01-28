import axios from 'axios';
import {
    LOG_IN_REQUEST,
    REGISTER_USER
} from './types'

export const loginRequestAction = (data) =>({
    type: LOG_IN_REQUEST,
    data
})