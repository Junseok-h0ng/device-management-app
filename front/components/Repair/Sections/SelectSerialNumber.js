import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import { Select } from 'antd';

const { Option } = Select;
function SelectSerialNumber(props) {

    const [option, setOption] = useState("");

    const {deviceList} = useSelector(state=>state.device);

    useEffect(() => {
      if(deviceList){
        let list = [];
        deviceList.map(device=>{
          list.push(<Option value={device._id}>{device.serialNumber}</Option>)
        });
        setOption(list);
      }
    }, [deviceList])

    function onChange(value) {
        props.handleSerialNumber(value);
    }
    

    return (
        <Select
        showSearch
        
        style={{ width: "200px" }}
        placeholder="Select a SerialNumber"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {option}
      </Select>
    )
}

export default SelectSerialNumber
