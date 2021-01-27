import React from 'react'


import Login from '../components/user/login'

function index() {
    const isLogin = false;



    return (
        <div>
            {isLogin &&
                indexPage   
            }
            <Login/>
        </div>
    )
}

export default index;
