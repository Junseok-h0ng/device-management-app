import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Router,{useRouter} from 'next/router';


import {Form,Button,Table,message,Row,Col} from 'antd'

import LoginedMenu from '../../components/menu/loginedMenu';
import { accessJoinGroupAction, loadJoinGroupActionRequest,connectedGroupStatus, rejectJoinGroupAction, increaseRoleGroupAction, decreaseRoleGroupAction } from '../../_actions/group_actions';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { userRoleRequestAction} from '../../_actions/user_actions';
import Loading from '../../components/util/Loading';

function team() {
    const user = useSelector(state=>state.user.data);
    const {join,isLoading,members,admins} = useSelector(state=>state.group)
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;

    const [selectedUser, setSelectedUser] = useState([]);
    const [hasMemberSelected,setHasMemberSelected] = useState(0);
    const [hasAdminSelected,setHasAdminSelected] = useState(0);
    const [hasJoinSelected,setHasJoinSelected] = useState(0);
    const [hasSelected,setHasSelected] = useState(0);
    
    let joinData = [];
    let membersData = [];
    let adminsData = [];

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
    const rowAdminSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setHasAdminSelected(selectedRowKeys.length);
            setSelectedUser(selectedRows);
            }
      };
    const rowMemberSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setHasMemberSelected(selectedRowKeys.length);
            setSelectedUser(selectedRows);
            }
      };
      const rowJoinSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setHasJoinSelected(selectedRowKeys.length);
            setSelectedUser(selectedRows);
            }
      };    
    const submitData = () =>{
        const data = {
            groupId:pid,
            userId:[]
        }
        selectedUser.map(user=>{
            data.userId.push(user.userId);
        });
        return data;
    }


    const onSubmitJoin = () =>{
        dispatch(accessJoinGroupAction(submitData()));
        window.location.reload();
    }
    const onSubmitIncrease = () =>{
        dispatch(increaseRoleGroupAction(submitData()));
        window.location.reload();
    }
    const onSubmitDecrease = () =>{
        dispatch(decreaseRoleGroupAction(submitData()));
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
        <Form onFinish={onSubmitDecrease}>
            <h1>관리자 목록</h1>
            <Table loading={isLoading}
            rowSelection={{type:Checkbox,...rowAdminSelection}} columns={columns} dataSource={adminsData}
            />
            <Button style={{marginTop:'10px'}} disabled={!hasAdminSelected} htmlType="submit">강등</Button>
        </Form>
    )

    const memberTable = (
        <Form onFinish={onSubmitIncrease}>
            <h1>멤버 목록</h1>
            <Table loading={isLoading}
            rowSelection={{type:Checkbox,...rowMemberSelection}} columns={columns} dataSource={membersData}
            />
            <Button style={{marginTop:'10px'}} disabled={!hasMemberSelected} htmlType="submit">승급</Button>
        </Form>
    )

    const joinTable = (
        <Form onFinish={onSubmitJoin}>
                <h1>참가 희망 인원</h1>
                <Table loading={isLoading}
                rowSelection={{type:Checkbox,...rowJoinSelection}} columns={columns} dataSource={joinData}
                />
                <Button style={{marginTop:'10px'}} disabled={!hasJoinSelected} htmlType="submit">수락</Button>
                <Button onClick={handleReject} style={{marginTop:'10px', marginLeft:'10px'}} disabled={!hasJoinSelected} htmlType = "button">거절</Button>
            </Form>
    )
    const pushTableData = (dataTarget,pushTarget) =>{
        dataTarget.map((user,index)=>{
            pushTarget.push({
                key:index,
                userId: user._id,
                email: user.email,
                name:user.name
            });
        });
    }

    const drawTable = ()=>{

        pushTableData(join,joinData);
        pushTableData(members,membersData);
        pushTableData(admins,adminsData);

        return (
            <Row gutter={[16,16]}>
                <Col span={24}>{adminTable}</Col>
                <Col span={24}>{memberTable}</Col>
                <Col span={24}>{joinTable}</Col>
            </Row>
        )
    } 

    return (
        <div>
        <LoginedMenu/>
        <div style={{
                display:'flex',justifyContent:'center',alignItems:'center', 
                width:'100%',height:'100vh',marginTop:'10px'}}>
            {isLoading ?
                <Loading/>
            :   
                drawTable()
            // <Row gutter={[16,16]}>
            //     <Col span={24}>{adminTable}</Col>
            //     <Col span={24}>{memberTable}</Col>
            //     <Col span={24}>{joinTable}</Col>
            // </Row>
            }
        </div>
    </div>
    )
}

export default team
 