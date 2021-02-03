import React from 'react';
import {useDispatch} from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import {Menu,Dropdown,Row,Col} from 'antd';
import {DownOutlined } from '@ant-design/icons'
import { logoutRequestAction } from '../../_actions/user_actions';

function loginedMenu() {

    const menu = (
        <Menu>
            <Menu.Item key="0">
            <Link href="/group">
                <a>Add Group</a>
            </Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1">
                UserGroup(12312)
            </Menu.Item>
        </Menu>
    )

    const dispatch = useDispatch();
    const onLogout = () =>{
        dispatch(logoutRequestAction());
        Router.push('/');
    }
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
