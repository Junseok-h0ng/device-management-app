import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Link from 'next/link'
import {
    DesktopOutlined,
    HomeOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';

import { Layout, Menu} from 'antd';

import { userStatusRequestAction } from '../_actions/user_actions';

function AppLayout({children}) {

    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userStatusRequestAction());
    }, []);
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsed>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/"><a>Home</a></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
            Files
            </Menu.Item>
        </Menu>
        </Sider>
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
