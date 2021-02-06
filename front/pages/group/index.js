import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Input,Button} from 'antd';

import LoginedMenu from '../../components/menu/loginedMenu'
import { createGroupActionRequest } from '../../_actions/group_actions';


function group() {
    const dispatch = useDispatch();
    const userInfo = useSelector(state=>state.user.data);

    const [createGroupName, setCreateGroupName] = useState("");
    const [joinGroupName, setJoinGroupName] = useState("")

    const handleCreateGroupName = (event)=>{
        setCreateGroupName(event.target.value);
    }
    const handleJoinGroupName = (event) =>{
        setJoinGroupName(event.target.value);
    }

    const handleCreateSubmit =()=>{
        const data ={
            root_admin: userInfo._id,
            name:createGroupName
        }
        dispatch(createGroupActionRequest(data));
    }
    const handleJoinSubmit = ()=>{

    }

    const layout = {
        labelCol: {span:10},
        wrapperCol: {span:16 }
    }

    return (
        <div>
            <LoginedMenu/>
            <div style={{
                display:'flex',justifyContent:'center',alignItems:'center',
                width:'100%',height:'100vh'}}>

                    <Form 
                    {...layout} layout="inline " onFinish={handleCreateSubmit}>
                        <Form.Item
                            label="CreateGroup">
                            <Input
                                id="createGroupName"
                                placeholder="GroupName"
                                value={createGroupName}
                                onChange={handleCreateGroupName}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </Form.Item> 
                    </Form>

                    <Form {...layout} layout="inline" onFinish={handleJoinSubmit}>
                        <Form.Item
                            label="JoinGroup"
                        >
                            <Input
                                id="joinGroupName"
                                placeholder="GroupName"
                                value={joinGroupName}
                                onChange={handleJoinGroupName}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Join</Button>
                        </Form.Item>
                    </Form>

            </div>
        </div>
    )
}

export default group
