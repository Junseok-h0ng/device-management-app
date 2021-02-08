import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';
import { userRoleRequestAction } from '../../_actions/user_actions';
import { connectedGroupStatus } from '../../_actions/group_actions';

function usergroup() {
    const user = useSelector(state=>state.user.data);
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;

    if(user){
        user.groups.map(group=>{
            if(group.groupId == pid){
                dispatch(userRoleRequestAction(group.role));
                dispatch(connectedGroupStatus(pid));
            }   
        });
    }

    return (
        <div>
            <LoginedMenu/>
            <p>Post: {pid}</p>
        </div>
    )
}

export default usergroup
