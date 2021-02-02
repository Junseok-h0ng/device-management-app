import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Button,Menu,Dropdown,Row,Col} from 'antd';
import {DownOutlined, UserOutlined } from '@ant-design/icons'
import { logoutRequestAction } from '../_actions/user_actions';
import Avatar from 'antd/lib/avatar/avatar';

function userProfile() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.data)
    const onLogout = () =>{
        dispatch(logoutRequestAction());
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                Add Group
            </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                UserGroup(12312)
            </Menu.Item>
        </Menu>
    )

    return (
        <div>
            <Row>
                <Col span={12}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Group <DownOutlined />
                        </a>
                    </Dropdown>
                </Col>
                <Col span={12}>
                    <a onClick={onLogout}>
                        Logout
                    </a>
                </Col>
            </Row>
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
