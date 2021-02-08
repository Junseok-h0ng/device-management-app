import React from 'react'
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';

function device() {
    const router = useRouter();
    const {pid} = router.query;
    return (
        <div>
            <LoginedMenu/>
            {pid}            
        </div>
    )
}

export default device
 