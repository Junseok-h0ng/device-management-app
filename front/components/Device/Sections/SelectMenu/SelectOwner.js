import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import { Select } from 'antd';


const { Option } = Select;
function SelectOwner(props) {

    const {members,admins} = useSelector(state=>state.group);
    const [option, setOption] = useState("")
   
    function onChange(value) {
        props.handleOwner(props.record,value);
      }
    useEffect(() => {
      if(members || admins){
        let list= [];
        admins.map(admin=>(
          list.push(<Option value={admin._id}>{admin.name}</Option>)
        ));
        members.map(member=>(
          list.push(<Option value={member._id}>{member.name}</Option>) 
        ));
        setOption(list)
      }
      
    }, [])
    
    return (
        <Select
        showSearch
        defaultValue={props.record.owner}
        style={{ width: 200 }}
        placeholder="Select a Owner"
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

export default SelectOwner
