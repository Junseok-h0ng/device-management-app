import React,{useState} from 'react'
import SelectSerialNumber from './Sections/SelectSerialNumber'
import SelectOption from './Sections/SelectOption'
import {Button, Form, Input} from 'antd'

function MemberForm() {


    const [deviceId, setDeviceId] = useState("");
    const [option, setOption] = useState("")

    const handleSerialNumber = (value) =>{
        setDeviceId(value);
    }
    const handleOption = (value) =>{
        setOption(value);
    }

    return (
        <div>
            <Form
                
            >
                <Form.Item>
                    <SelectSerialNumber handleSerialNumber={handleSerialNumber}/>
                </Form.Item>
                <Form.Item>
                    <SelectOption handleOption={handleOption}/>
                </Form.Item>
                <Form.Item>
                    <Input
                     style={{width:"200px"}}
                     placeholder="Enter Device Error"
                     />
                </Form.Item>
                <Form.Item>
                    <Button>전송</Button>
                </Form.Item>

            </Form>
            
        </div>
    )
}

export default MemberForm
