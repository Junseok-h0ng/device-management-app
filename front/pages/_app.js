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

function _app({Component,store}) {

    return (
        <Provider store={store}>
            <Head>
                <title>Device Management Application</title>
            </Head>
            <AppLayout>
                <Component/>
            </AppLayout>
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
