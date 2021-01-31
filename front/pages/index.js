import React from 'react'
import {useSelector} from 'react-redux'


import Login from '../components/user/login'
import UserProfile from './userProfile'

function index() {
    const {isLogin} = useSelector(state=>state.user)
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
