import React,{useEffect}  from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useRouter} from 'next/router';
import LoginedMenu from '../../components/menu/loginedMenu';
import { userRoleRequestAction } from '../../_actions/user_actions';
import { connectedGroupStatus } from '../../_actions/group_actions';
import Loading from '../../components/util/Loading';
import { Button,List, Avatar,Table} from 'antd'




function notice() {
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
    }, [user,pid]);

    const dataSource = [
        {
          key: '1',
          title: 'Mike',
          author: 'aur',
          date: '10 Downing Street',
        },
        {
          key: '2',
          title: 'John',
          author: 42,
          date: '10 Downing Street',
        },
      ];

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width:'60%',
          ellipsis:true
        },
        {
          title: 'Author',
          dataIndex: 'author',
          key: 'author',
          width:'20%',
          ellipsis:true
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          ellipsis:true
        },
      ];
    
    return (
        
        <div>
            <div > 
            {
                isLoading ?
                    <Loading/>
                :
                <>
                    {/* {role == 'owner' || role == 'admin' ?
                        <Button>Add a Notice</Button>
                        :
                        ''
                    } */}
                     <Table style={{margin:'0px 10%'}}dataSource={dataSource} columns={columns}/>
                </>
            }   
            </div>   
        </div>
    )
}


export default notice
 