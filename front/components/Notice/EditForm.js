import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Router from 'next/router'
import {Button,Form, Input} from 'antd';
import { editNoticeAction, resetNoticeInfoAction } from '../../_actions/notice_action';
function EditForm(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    
    const {info} = useSelector(state=>state.notice);

    useEffect(() => {
        if(info){
            setTitle(info.title);
            setDescription(info.description);
        }
    }, [info])

    const layout = {
        labelCol: {span:4},
        wrapperCol: {span:16}
    }
    const tailLayout = {
        wrapperCol: { offset: 4, span: 16 },
      };

    const onHandleTitle = (event) => {
        setTitle(event.target.value);
    } 
    const onHandleDescription = (event) => {
        setDescription(event.target.value);
    }

    const onSubmit = ()=>{
        const data = {
            noticeId:props.noticeId,
            title,
            description
        }
        dispatch(editNoticeAction(data));
        dispatch(resetNoticeInfoAction());
        Router.push(`/notice/${props.groupId}`);
    }

    return (
        <div>
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

export default EditForm
