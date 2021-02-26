import React,{useEffect}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router';
import { userRoleRequestAction } from '../../_actions/user_actions';
import { connectedGroupStatus } from '../../_actions/group_actions';
import Loading from '../../components/util/Loading';

import ErrorPage from '../../components/util/ErrorPage';
import { loadNoticeAction } from '../../_actions/notice_action';
import { deviceOwnerListAction } from '../../_actions/device_action';
import AdminForm from '../../components/Repair/adminForm';
import MemberForm from '../../components/Repair/memberForm';
import { loadRepairAction } from '../../_actions/repair_action';




function repair() {
    const router = useRouter();
    const {pid} = router.query;
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.data);
    const {role,isLoading} = useSelector(state=>state.user);

    useEffect(() => {
        if(user){
            user.groups.map(group=>{
                if(group.groupId === pid){
                  dispatch(userRoleRequestAction(group.role));
                  dispatch(connectedGroupStatus(pid));
                }
            });
        }
    }, [user,pid]);

    
    return (
        
        <div>
            <div > 
            {
                isLoading ?
                    <Loading/>
                :
                  <div style={{margin:'0px 10%'}}>
                    {role != null ?
                        <div>
                            {role === 'owner' || role === 'admin' ?
                                <AdminForm groupId={pid}/>
                            :
                                <MemberForm groupId={pid}/>
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


export default repair
 