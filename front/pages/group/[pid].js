import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';
import { userRoleRequestAction, userStatusRequestAction } from '../../_actions/user_actions';
import { connectedGroupStatus, loadGroupsActionRequest } from '../../_actions/group_actions';
import Loading from '../../components/util/Loading'

function usergroup() {
    const user = useSelector(state=>state.user.data);
    const {isLoading,role} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;

    useEffect(() => {
        if(user){
           user.groups.map(group=>{
               if(group.groupId === pid){
                dispatch(userRoleRequestAction(group.role));
                dispatch(connectedGroupStatus(pid));
               }
           });
        }
    }, [user])



    return (
        <div>
            <LoginedMenu/>
            <div style={{
            display:'flex', justifyContent:'center',alignItems:'center',
            width:'100%',height:'100vh'}}>
                {isLoading ?
                    <Loading/>
                :
                <div>
                    <p>그룹 ID: {pid}</p>
                    <p>그룹의 권한 : {role} </p>
                    <p>근무지 : </p>
                    <p>사용중인 장비 : </p>
                </div>
                }
            </div>
        </div>
    )
}

export default usergroup
