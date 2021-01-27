import React,{useState} from 'react'
import {Form,Input,Button,Row,Col} from 'antd'

function login() {
    const layout = {
        labelCol: {span:8},
        wrapperCol: {span:16}
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const handleEmailChange = (event)=>{
        setEmail(event.target.value);        
    }
    const handlePasswordChange = (event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit = ()=>{
        let body = {
            email,
            password
        }
        console.log(body);
        // dispatch
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
                                id="email"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </Form.Item>
                        <Form.Item 
                            required
                            label="Password">
                            <Input.Password 
                                id="password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button htmlType="submit">
                                Sign In
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24}>
                    <Button style={{float:'right',marginLeft:'10px'}}>
                        Sign Up
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
        </div>
    )
}

export default login
