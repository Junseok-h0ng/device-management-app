import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';
import { userRoleRequestAction } from '../../_actions/user_actions';

function usergroup() {
    const user = useSelector(state=>state.user.data);
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;
    user.groups.map(group=>{
        if(group.groupId == pid){
            dispatch(userRoleRequestAction(group.role));
        }   
    });
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
