import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Router,{useRouter} from 'next/router';


import {Form,Button,Table,message,Row,Col} from 'antd'

import LoginedMenu from '../../components/menu/loginedMenu';
import { accessJoinGroupAction, loadJoinGroupActionRequest,connectedGroupStatus, rejectJoinGroupAction } from '../../_actions/group_actions';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { userRoleRequestAction} from '../../_actions/user_actions';
import Loading from '../../components/util/Loading';

function team() {
    const user = useSelector(state=>state.user.data);
    const {join,isLoading} = useSelector(state=>state.group)
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;

    useEffect(() => {
        if(user){
            user.groups.map(group=>{
                if(group.groupId === pid){
                    if(group.role === 'owner'  || group.role === 'admin'){
                        dispatch(userRoleRequestAction(group.role));
                        dispatch(connectedGroupStatus(pid));
                        dispatch(loadJoinGroupActionRequest({groupId:pid}));
                    }else{
                        Router.push('/');
                        message.error('권한이 없는 아이디 입니다.');
                    }

                }
            })
        }        
    }, [user]);

    const [selectedUser, setSelectedUser] = useState([]);
    const [hasSelected,setHasSelected] = useState(0);

    let data = [];
    join.map((user,index)=>{
        data.push({
            key:index,
            userId: user._id,
            email: user.email,
            name: user.name
        })
    });
    const columns = [
        {
            title: 'UserId',
            dataIndex: 'userId'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        }
    ]

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        setHasSelected(selectedRowKeys.length);
        setSelectedUser(selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };

    const onSubmit = () =>{
        const data = {
            groupId:pid,
            userId:[]
        }
        selectedUser.map(user=>{
            data.userId.push(user.userId);
        });
        dispatch(accessJoinGroupAction(data));
        window.location.reload();
    }
    const handleReject = () =>{
        const data = {
            groupId:pid,
            userId:[]
        }
        selectedUser.map(user=>{
            data.userId.push(user.userId);
        });
        dispatch(rejectJoinGroupAction(data));
        window.location.reload();
    }
    const adminTable = (
        <Form onFinish={onSubmit}>
            <h1>관리자 목록</h1>
            <Table
            rowSelection={{type:Checkbox,...rowSelection}} columns={columns} dataSource={data}
            />
            <Button style={{marginTop:'10px'}} disabled={!hasSelected} htmlType="submit">수락</Button>
        </Form>
    )

    const memberTable = (
        <Form onFinish={onSubmit}>
            <h1>그룹 멤버 목록</h1>
            <Table
            rowSelection={{type:Checkbox,...rowSelection}} columns={columns} dataSource={data}
            />
            <Button style={{marginTop:'10px',marginLeft:'10px'}} disabled={!hasSelected} htmlType="submit">수락</Button>
        </Form>
    )

    const joinTable = (
        <Form onFinish={onSubmit}>
                <h1>그룹 참가 희망 인원</h1>
                <Table
                rowSelection={{type:Checkbox,...rowSelection}} columns={columns} dataSource={data}
                />
                <Button style={{marginTop:'10px'}} htmlType="submit">수락</Button>
                <Button onClick={handleReject} style={{marginTop:'10px'}} htmlType = "button">거절</Button>
            </Form>
    )

    return (
        <div>
        <LoginedMenu/>
        <div style={{
                display:'flex',justifyContent:'center',alignItems:'center',
                width:'100%',height:'100vh',marginTop:'10px'}}>
            {isLoading ?
                <Loading/>
            :   
                <Row gutter={[16,16]}>
                    <Col span={24}>{adminTable}</Col>
                    <Col span={24}>{memberTable}</Col>
                    <Col span={24}>{joinTable}</Col>
                </Row>
                    
            }
        </div>
    </div>
    )
}

export default team
 