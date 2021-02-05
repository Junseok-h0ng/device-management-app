import React from 'react'
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';

function usergroup() {
    const router = useRouter();
    const {pid} = router.query;
    return (
        <div>
            <LoginedMenu/>
            <p>Post: {pid}</p>
        </div>
    )
}

usergroup.getInitialProps = ()=>{
    const userStatus = "member";
    return userStatus;
}

export default usergroup