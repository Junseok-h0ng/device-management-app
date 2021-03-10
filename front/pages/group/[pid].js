import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import  Router,{useRouter} from 'next/router';
import {Button} from 'antd';
import { userRoleRequestAction } from '../../_actions/user_actions';
import { connectedGroupStatus, deleteGroupAction } from '../../_actions/group_actions';
import Loading from '../../components/util/Loading'
import ErrorPage from '../../components/util/ErrorPage';
import { resetDeviceAction } from '../../_actions/device_action';

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
                dispatch(resetDeviceAction());
                dispatch(connectedGroupStatus(pid));
               }
           });
        }
    }, [user,pid])
    
    const deleteGroup = () =>{
        dispatch(deleteGroupAction({groupId:pid}));
        Router.push('/');
    }

    return (
        <div>
            <div>
                {isLoading ?
                    <Loading/>
                :
                <div>
                    {role === 'join'?
                    <div>
                        <p>어드민이 그룹권한을 검토중입니다.</p>
                    </div>
                    :role != null?
                    <div>
                        <p>그룹 ID: {pid}</p>
                        <p>그룹의 권한 : {role} </p>
                        {role === 'owner' &&
                            <Button onClick={deleteGroup}>그룹 삭제</Button>
                        }
                    </div>
                    
                    :
                    <ErrorPage/>
                }

                </div>
                }
            </div>
        </div>
    )
}

export default usergroup
