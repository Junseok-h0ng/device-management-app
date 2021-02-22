import React,{useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Select } from 'antd';
import { loadLocationAction } from '../../../../_actions/device_action';

const { Option } = Select;
function SelectLocation(props) {
    const dispatch = useDispatch();
    const [option, setOption] = useState("");
    const {location} = useSelector(state=>state.device);

    useEffect(() => {
      if(location == null){
        dispatch(loadLocationAction({groupId:props.groupId}));
      }else{
        let list = [];
        location.map(location=>(
          list.push(<Option value={location}>{location}</Option>)
        ));
        setOption(list);
      }
    }, [location])  

    function onChange(value) {
        props.handleLocation(props.record,value);
      }

    return (
        <Select
        showSearch
        defaultValue={props.record.location}
        style={{ width: 200 }}
        placeholder="Select a Location"
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

export default SelectLocation
