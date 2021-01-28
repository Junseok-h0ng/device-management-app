import React from 'react'
import {useSelector} from 'react-redux'


import Login from '../components/user/login'

function index() {
    const {isLogin} = useSelector(state=>state.user)
    return (
        <div>
            {isLogin && 
                <div>
                    index
                </div>
            }
            {!isLogin &&
                <Login/>
            }
            
        </div>
    )
}

export default index;
