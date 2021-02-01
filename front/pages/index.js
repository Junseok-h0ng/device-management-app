import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {message} from 'antd'

import Login from '../components/user/login'
import UserProfile from './userProfile'
import { resetErrorMessage } from '../_actions/user_actions'



function index() {
    const {isLogin,error} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        //에러가 있을시 에러메시지 출력
        if(error){
            message.error(error);
            dispatch(resetErrorMessage());
        }
    }, [error])

    return (
        <div>
            {isLogin && 
                <UserProfile/>
            }
            {!isLogin &&
                <Login/>
            }
        </div>
    )
}

export default index;
