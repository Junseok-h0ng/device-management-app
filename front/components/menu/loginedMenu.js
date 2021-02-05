import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {Menu,Dropdown,Row,Col} from 'antd';
import {DownOutlined } from '@ant-design/icons'
import { logoutRequestAction } from '../../_actions/user_actions';
import { loadGroupsActionRequest } from '../../_actions/group_actions';

function loginedMenu() {

    const userData = useSelector(state=>state.user.data);
    const groupsData = useSelector(state=>state.group.data);
    const dispatch = useDispatch();

    const onLogout = () =>{
        dispatch(logoutRequestAction());
        Router.push('/');
    }   

    useEffect(() => {
        if(userData)
            dispatch(loadGroupsActionRequest(userData.groups));

    },[userData])
    
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link href="/group">
                    <a>AddGroup</a>
                </Link>
            </Menu.Item>           
            <Menu.Divider />
            {groupsData && groupsData.map((group,index)=>(
                <Menu.Item key={index+1}>
                    <Link href={`/group/${group._id}`}>
                        <a>{group.name}</a>
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    )

    return (
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
    )
}

export default loginedMenu
