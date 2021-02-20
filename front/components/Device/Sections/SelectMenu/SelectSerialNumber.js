import React from 'react'
import { Select } from 'antd';

const { Option } = Select;
function SelectSerialNumber(props) {
    console.log(props);
    function onChange(value) {
        props.handleSerialNumber(props.record,value);
      }

    return (
        <Select
        showSearch
        
        style={{ width: 200 }}
        placeholder="Select a SerialNumber"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="3123123">3123123</Option>
        <Option value="412412">412412</Option>
        <Option value="52151235">52151235</Option>
      </Select>
    )
}

export default SelectSerialNumber
