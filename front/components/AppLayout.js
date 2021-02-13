import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';


import { Layout} from 'antd';

import { userStatusRequestAction } from '../_actions/user_actions';
import Sider from './menu/sider'


function AppLayout({children}) {

    const {Content, Footer } = Layout;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userStatusRequestAction());
    }, [children]);
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider/>
        <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ margin:'Auto', width:'50%',padding:'10px' }}>
                {children}
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </Layout>
    )
}

export default AppLayout
