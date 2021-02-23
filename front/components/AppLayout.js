import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';


import { Layout} from 'antd';

import { userStatusRequestAction } from '../_actions/user_actions';
import Sider from './menu/sider'
import Router from 'next/router';
import LoginedMenu from '../components/menu/loginedMenu'

function AppLayout({children}) {

    const {Header,Content, Footer } = Layout;
    const {isLogin} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userStatusRequestAction());
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Header>
            {isLogin &&
                <LoginedMenu/>  
            }
        </Header>
        <Layout>
            <Sider/>
            <Content style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                {children}
            </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    )
}

export default AppLayout
