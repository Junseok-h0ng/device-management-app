import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Router from 'next/router';
import {Form,Input,Button,Row,Col,message} from 'antd'
import { LockOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { registerRequestAction, resetErrorMessage } from '../_actions/user_actions';

function login(props) {
    const layout = {
        labelCol: {span:8},
        wrapperCol: {span:16}
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const dispatch = useDispatch();
    const {error} = useSelector(state=>state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleEmailChange = (event)=>{
        setEmail(event.target.value);        
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    const handleNameChange = (event)=>{
        setName(event.target.value);
    }
    const handleSubmit = ()=>{
        const userData = {
            email,
            password,
            name
        }
        if(password.length < 5){
            return message.error('최소 패스워드는 5자리 이상입니다.');
        }
        dispatch(registerRequestAction(userData));
    }
    useEffect(() => {
        if(error){
            message.error(error);
            dispatch(resetErrorMessage());
        }
    }, [error])
    
    return (
        <div style={{
            display:'flex', justifyContent:'center',alignItems:'center',
            width:'100%',height:'100vh'
        }}>
            <Row>
                <Col span={24}>
                    <Form
                        {...layout}
                        onFinish={handleSubmit}
                    >
                        <Form.Item 
                            required
                            label="Email">
                            <Input 
                                prefix={<UserOutlined className="site-form-item-icon"/>}
                                id="email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                            />
                        </Form.Item>
                        <Form.Item 
                            required
                            label="Password">
                            <Input.Password
                                prefix= {<LockOutlined className="site-form-item-icon"/>}
                                id="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </Form.Item>
                        <Form.Item 
                            required
                            label="Name">
                            <Input
                                prefix={<SmileOutlined className="site-form-item-icon"/>}
                                id="name"
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </Form.Item>                    
                        <Form.Item {...tailLayout}>
                            <Button htmlType="submit">
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>
        </div>
    )
}

export default login
