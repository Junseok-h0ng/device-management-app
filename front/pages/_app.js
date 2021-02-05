import React from 'react';

import Head from 'next/head';

import withRedux from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../_reducers';
import rootSaga from '../sagas';

import 'antd/dist/antd.css';

import AppLayout from '../components/AppLayout';

function _app({Component,pageProps,store}) {
    return (
        <Provider store={store}>
            <Head>
                <title>Device Management Application</title>
            </Head>
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>
        </Provider>
    );
}

_app.getInitialProps = async(context)=>{
    const { ctx, Component } = context;
    let pageProps = {};
    if (Component.getInitialProps) {
      // Component (pages 폴더에 있는 컴포넌트)에 getInitialProps가 있다면
      pageProps = (await Component.getInitialProps(ctx)) || {};
  
      return { pageProps };
    }
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
