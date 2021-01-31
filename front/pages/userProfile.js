import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'antd';
import { logoutRequestAction } from '../_actions/user_actions';

function userProfile() {
    const dispatch = useDispatch();
    const onLogout = () =>{
        dispatch(logoutRequestAction());
    }
    return (
        <div>
            <Button onClick={onLogout}>Logout</Button>
        </div>
    )
}

export default userProfile
