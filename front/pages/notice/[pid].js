import React,{useEffect}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router';
import { userRoleRequestAction } from '../../_actions/user_actions';
import { connectedGroupStatus } from '../../_actions/group_actions';
import Loading from '../../components/util/Loading';

import ErrorPage from '../../components/util/ErrorPage';
import NoticeTable from '../../components/Notice/NoticeTable';
import { loadNoticeAction } from '../../_actions/notice_action';




function notice() {
    const router = useRouter();
    const {pid} = router.query;
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user.data);
    const {role,isLoading} = useSelector(state=>state.user);
    const {info} = useSelector(state=>state.notice);

    useEffect(() => {
        if(user){
            user.groups.map(group=>{
                if(group.groupId === pid){
                  dispatch(userRoleRequestAction(group.role));
                  dispatch(connectedGroupStatus(pid));
                  dispatch(loadNoticeAction({groupId:pid}));   
                }
            });
        }
    }, [user,pid,info]);

    
    return (
        
        <div>
            <div > 
            {
                isLoading ?
                    <Loading/>
                :
                  <div style={{margin:'0px 10%'}}>
                    {role != null ?
                      <NoticeTable groupId={pid}/>
                    : 
                      <ErrorPage/>
                    }
                      
                  </div>   
            }   
            </div>   
        </div>
    )
}


export default notice
 