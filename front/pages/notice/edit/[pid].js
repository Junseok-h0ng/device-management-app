import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import  {useRouter} from 'next/router';

import {  loadInfoNoticeAction } from '../../../_actions/notice_action';
import { userRoleRequestAction } from '../../../_actions/user_actions';
import { connectedGroupStatus } from '../../../_actions/group_actions';
import EditForm from '../../../components/Notice/EditForm';

function AddNotice() {



    const user = useSelector(state=>state.user.data);
    const {role} = useSelector(state=>state.user);
    

    const dispatch = useDispatch();

    const router = useRouter();
    const {pid} = router.query;

    const  getUrlParams = () => {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        return params;
    }

    useEffect(() => {
        
        if(user){
            user.groups.map(group=>{
                if(group.groupId === pid){
                    if(group.role === 'owner' || group.role === 'admin'){
                        dispatch(userRoleRequestAction(group.role));
                        dispatch(connectedGroupStatus(pid));
                        dispatch(loadInfoNoticeAction({noticeId:getUrlParams().noticeId}));   
                    }
                }
            });
        }
    }, [user,pid])



    return (
        
        <div style={{margin:'0px 10%',width:'2400px'}}>
                
          {role != null &&
            <EditForm noticeId={getUrlParams().noticeId} groupId={pid}/>
          }
        
        </div>

    )
}

export default AddNotice
