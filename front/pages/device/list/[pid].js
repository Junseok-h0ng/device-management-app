import React,{useEffect}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router';
import {Row,Col} from 'antd';
import LoginedMenu from '../../../components/menu/loginedMenu';
import { userRoleRequestAction } from '../../../_actions/user_actions';
import { connectedGroupStatus } from '../../../_actions/group_actions';
import Loading from '../../../components/util/Loading';
import ErrorPage from '../../../components/util/ErrorPage';
import EditDeviceTable from '../../../components/Device/EditDeviceTable';



function device() {
    const router = useRouter();
    const {pid} = router.query;
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.data);
    const {role,isLoading} = useSelector(state=>state.user);

    useEffect(() => {
        if(user){
            user.groups.map(group=>{
                if(group.groupId === pid){
                    if(group.role === 'owner' || group.role === 'admin'){
                        dispatch(userRoleRequestAction(group.role));
                        dispatch(connectedGroupStatus(pid));
                    }
                }
            });
        }
    }, [user,pid])
    
    return (
        <div>
            <div>
            {
                isLoading ?
                    <Loading/>
                :
                <div style={{margin:'0px 10%'}}>
                    {role != null ?
                        <EditDeviceTable pid ={pid}/>
                    :
                        <ErrorPage/>
                    }
                </div>
            }   
            </div>   
        </div>
    )
}


export default device
 