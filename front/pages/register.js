import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {Form,Input,Button,Row,Col} from 'antd'
import { LockOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { registerRequestAction } from '../_actions/user_actions';

function login() {
    const layout = {
        labelCol: {span:8},
        wrapperCol: {span:16}
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const dispatch = useDispatch();
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
        dispatch(registerRequestAction(userData));
    }
    
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