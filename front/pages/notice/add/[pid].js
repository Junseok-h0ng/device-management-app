import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import  Router,{useRouter} from 'next/router';
import {Button,Form, Input} from 'antd';
import { addNoticeAction } from '../../../_actions/notice_action';
import { userRoleRequestAction } from '../../../_actions/user_actions';
import { connectedGroupStatus } from '../../../_actions/group_actions';

function AddNotice() {

    const layout = {
        labelCol: {span:4},
        wrapperCol: {span:16}
    }
    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
      };

    const user = useSelector(state=>state.user.data);
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    const router = useRouter();
    const {pid} = router.query;

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

    const onHandleTitle = (event) => {
        setTitle(event.target.value);
    } 
    const onHandleDescription = (event) => {
        setDescription(event.target.value);
    }

    const onSubmit = ()=>{
        const data = {
            groupId:pid,
            title,
            author:user._id,
            description
        }
        dispatch(addNoticeAction(data));
        Router.push(`/notice/${pid}`);
    }

    return (
        <div style={{margin:'0px 10%',width:'2400px'}}>
            <Form
                {...layout}
                onFinish={onSubmit}
            >
                <Form.Item label="Title">
                    <Input placeholder="Title" value={title} onChange={onHandleTitle}/>
                </Form.Item>
                <Form.Item label="Description" >
                    <Input.TextArea placeholder="Description" value={description} onChange={onHandleDescription} autoSize={{ minRows: 5}}/>
                </Form.Item>
                <Form.Item
                    {...tailLayout}
                >
                    <Button htmlType="submit" type="primary">확인</Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default AddNotice
