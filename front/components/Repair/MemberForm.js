import React,{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import SelectSerialNumber from './Sections/SelectSerialNumber';
import SelectIssue from './Sections/SelectIssue';
import {Button, Form, Input,message} from 'antd';
import { addRepairAction, loadRepairAction } from '../../_actions/repair_action';
import { deviceOwnerListAction } from '../../_actions/device_action';

function MemberForm(props) {

    const ownerId = useSelector(state=>state.user.data._id);

    const [deviceId, setDeviceId] = useState("");
    const [issue, setIssue] = useState("");
    const [explain, setExplain] = useState("")

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(deviceOwnerListAction({ownerId}));
    }, [])


   

    const handleSerialNumber = (value) =>{
        setDeviceId(value);
    }
    const handleIssue = (value) =>{
        setIssue(value);
    }
    const handleExplain = (event)=>{
        setExplain(event.target.value);
    }


    const onSubmit = () =>{
        const data ={
            groupId : props.groupId,
            deviceId,
            issue,
            explain,
            done:false
        }
        dispatch(addRepairAction(data));
        setDeviceId('');
        setIssue('');
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
                    <SelectIssue handleIssue={handleIssue}/>
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
