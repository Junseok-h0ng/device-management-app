import React,{useEffect}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router';
import {Row,Col} from 'antd';
import LoginedMenu from '../../../components/menu/loginedMenu';
import { userRoleRequestAction } from '../../../_actions/user_actions';
import { connectedGroupStatus } from '../../../_actions/group_actions';
import Loading from '../../../components/util/Loading';
import ErrorPage from '../../../components/util/ErrorPage';
import AddDeviceTable from '../../../components/Device/AddDeviceTable'



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
            <LoginedMenu/>
            <div style={{
                display:'flex',justifyContent:'center',alignItems:'center', 
                width:'100%',height:'100vh',marginTop:'10px'}}>
            {
                isLoading ?
                    <Loading/>
                :
                <div>
                    {role != null ?
                        <AddDeviceTable pid={pid}/>                          
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
 