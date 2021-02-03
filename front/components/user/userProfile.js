import React from 'react';
import {useSelector} from 'react-redux';
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons'
import LoginedMenu from '../menu/loginedMenu';

function userProfile() {

    const user = useSelector(state=>state.user.data)

    return (
        <div>
            <LoginedMenu/>
            <div style={{
                display:'flex',justifyContent:'center',alignItems:'center',
                width:'100%',height:'100vh'
            }}>
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
