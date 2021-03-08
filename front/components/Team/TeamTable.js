import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';


import {Form,Button,Table,Row,Col,Checkbox} from 'antd'

function TeamTable() {

    const {join,members,admins} = useSelector(state=>state.group);

    const [selectedUser, setSelectedUser] = useState([]);
    const [hasMemberSelected,setHasMemberSelected] = useState(0);
    const [hasAdminSelected,setHasAdminSelected] = useState(0);
    const [hasJoinSelected,setHasJoinSelected] = useState(0);

    let joinData = [];
    let membersData = [];
    let adminsData = [];


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
    


    useEffect(() => {
        pushTableData(join,joinData);
        pushTableData(members,membersData);
        pushTableData(admins,adminsData);
        console.log(members);
    },[])

    const columns = [
        {
            title: 'UserId',
            dataIndex: 'userId',
            ellipsis:true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            ellipsis:true
        },
        {
            title: 'Name',
            dataIndex: 'name',
            ellipsis:true
        }
    ]


    
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
            <Table 
            rowSelection={{type:Checkbox,...rowAdminSelection}} columns={columns} dataSource={adminsData}
            />
            <Button style={{marginTop:'10px'}} disabled={!hasAdminSelected} htmlType="submit">강등</Button>
        </Form>
    )

    const memberTable = (
        <Form onFinish={onSubmitIncrease}>
            <h1>멤버 목록</h1>
            <Table
            rowSelection={{type:Checkbox,...rowMemberSelection}} columns={columns} dataSource={membersData}
            />
            <Button style={{marginTop:'10px'}} disabled={!hasMemberSelected} htmlType="submit">승급</Button>
        </Form>
    )

    const joinTable = (
        <Form onFinish={onSubmitJoin}>
            <h1>참가 희망 인원</h1>
            <Table
            rowSelection={{type:Checkbox,...rowJoinSelection}} columns={columns} dataSource={joinData}
            />
            <Button style={{marginTop:'10px'}} disabled={!hasJoinSelected} htmlType="submit">수락</Button>
            <Button onClick={handleReject} style={{marginTop:'10px', marginLeft:'10px'}} disabled={!hasJoinSelected} htmlType = "button">거절</Button>
        </Form>
    )

    
    return (
        <div>
            <Row gutter={[16,16]}>
                <Col span={24}>{adminTable}</Col>
                <Col span={24}>{memberTable}</Col>
                <Col span={24}>{joinTable}</Col>
            </Row>
        </div>
    )
}

export default TeamTable
