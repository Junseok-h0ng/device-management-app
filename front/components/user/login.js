import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Link from 'next/link'
import {Form,Input,Button,Row,Col} from 'antd'
import { LockOutlined, UserOutlined} from '@ant-design/icons';

import { loginRequestAction } from '../../_actions/user_actions';

function login() {
    const layout = {
        labelCol: {span:8},
        wrapperCol: {span:16}
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const dispatch = useDispatch();
    const {isLoading} = useSelector(state=>state.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleEmailChange = (event)=>{
        setEmail(event.target.value);        
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit = ()=>{
        setEmail("");
        setPassword("");
        let userData = {
            email,
            password
        }
        dispatch(loginRequestAction(userData))
    }
    return (
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
                        <Form.Item {...tailLayout}>
                            <Button htmlType="submit" loading={isLoading}>
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24}>
                    <Button style={{float:'right',marginLeft:'10px'}}>
                        <Link href="/register"><a>Sign Up</a></Link>
                    </Button>
                    <Button style={{float:'right',marginLeft:'10px'}}>
                        Sign In Kakao
                    </Button>
                    <Button style={{float:'right',marginLeft:'10px'}}>
                        Sign In Naver
                    </Button>
                    <Button style={{float:'right'}}>
                        Sign In Google
                    </Button>
                </Col>
            </Row>
    )
}

export default login
