import React from 'react'
import { Select } from 'antd';

const { Option } = Select;
function SelectLocation(props) {

    function onChange(value) {
        props.handleLocation(props.record,value);
      }

    return (
        <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Location"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    )
}

export default SelectLocation
