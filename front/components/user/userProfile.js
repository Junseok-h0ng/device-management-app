import React from 'react';
import {useSelector} from 'react-redux';
import {AutoComplete, Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons'
import LoginedMenu from '../menu/loginedMenu';

function userProfile() {

    const user = useSelector(state=>state.user.data)

    return (
        <div>
            <div >
                <div>
                    <Avatar style={{marginRight:'10px'}} icon={<UserOutlined/>}/>
                    <span>{user.name}</span>
                    <p>{user.email}</p>
                </div>
               
            </div>
        </div>
    )
}

export default userProfile
