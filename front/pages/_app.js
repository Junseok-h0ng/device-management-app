import React from 'react';
import Head from 'next/head';

import Link from 'next/link'

import withRedux from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../_reducers';
import rootSaga from '../sagas';

import 'antd/dist/antd.css';
import { Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';





function _app({Component,store}) {


    const { Header, Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    return (
        <Provider store={store}>
            <Head>
                <title>Device Management Application</title>
            </Head>
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
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ margin:'Auto', width:'50%',padding:'10px' }}>
                        <Component/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Provider>
    );
}

export default withRedux((initialState,options)=>{
    const sagaMiddleware = createSagaMiddleware();
    const middleWares = [sagaMiddleware];
    const enhancer = compose(applyMiddleware(...middleWares),
        typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
        );
    const store = createStore(rootReducer,initialState,enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
})(_app);
