import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

import {Form,Button,Table} from 'antd'

import LoginedMenu from '../../components/menu/loginedMenu';
import { accessJoinGroupAction, loadJoinGroupActionRequest } from '../../_actions/group_actions';
import Checkbox from 'antd/lib/checkbox/Checkbox';

function team() {
    const {join} = useSelector(state=>state.group)
    const dispatch = useDispatch();
    const router = useRouter();
    const {pid} = router.query;

    useEffect(() => {
        dispatch(loadJoinGroupActionRequest({groupId:pid}));
    }, []);

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
    }

    return (
        <div>
            <LoginedMenu/>
            <div  style={{
                display:'flex',justifyContent:'center',alignItems:'center',
                width:'100%',height:'100vh'}}>
                <Form onFinish={onSubmit}>
                    <h1>그룹 참가 희망 인원</h1>
                    <Table
                    rowSelection={{type:Checkbox,...rowSelection}} columns={columns} dataSource={data}
                    />
                    <Button disabled={!hasSelected} htmlType="submit">수락</Button>
                </Form>
                
            </div>
            

        </div>
    )
}

export default team
 