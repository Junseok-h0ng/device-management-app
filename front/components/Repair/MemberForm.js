import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import SelectSerialNumber from './Sections/SelectSerialNumber';
import SelectOption from './Sections/SelectOption';
import {Button, Form, Input,message} from 'antd';
import { addRepairAction } from '../../_actions/repair_action';

function MemberForm(props) {


    const [deviceId, setDeviceId] = useState("");
    const [option, setOption] = useState("");
    const [explain, setExplain] = useState("")

    const dispatch = useDispatch();

    const handleSerialNumber = (value) =>{
        setDeviceId(value);
    }
    const handleOption = (value) =>{
        setOption(value);
    }
    const handleExplain = (event)=>{
        setExplain(event.target.value);
    }


    const onSubmit = () =>{
        const data ={
            groupId : props.groupId,
            deviceId,
            option,
            explain
        }
        console.log(data);
        dispatch(addRepairAction(data));
        setDeviceId('');
        setOption('');
        setExplain('');
        message.success('수리요청을 성공적으로 완료했습니다.')
    }


    return (
        <div>
            <Form  
                onFinish={onSubmit}
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
                     placeholder="Enter Error Explan"
                     value={explain}
                     onChange={handleExplain}
                     />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">전송</Button>
                </Form.Item>

            </Form>
            
        </div>
    )
}

export default MemberForm
