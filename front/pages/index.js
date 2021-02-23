import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {message} from 'antd';


import Login from '../components/user/login'
import UserProfile from '../components/user/userProfile'
import { resetErrorMessage, resetUserStatus } from '../_actions/user_actions'
import Loading from '../components/util/Loading';

function index() {
    const {isLogin,error,isLoading} = useSelector(state=>state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetUserStatus());
        //에러가 있을시 에러메시지 출력
        if(error){
            message.error(error);
            dispatch(resetErrorMessage());
        }
    }, [error])



    return (
        <div>
            {isLoading ?
                <Loading/>
            :
            <div>
                {isLogin ?                    
                    <UserProfile/>
                :
                    <Login/>
                }
            </div>  

            }
        </div>
    )
}

export default index;
