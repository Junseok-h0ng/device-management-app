import React from 'react'
import { Select } from 'antd';

const { Option } = Select;
function SelectOwner(props) {

    function onChange(value) {
        props.handleOwner(props.record,value);
      }

    return (
        <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Owner"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="6027bee30ca8e815fc7403b9">6027bee30ca8e815fc7403b9</Option>
      </Select>
    )
}

export default SelectOwner
