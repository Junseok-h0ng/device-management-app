import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
function SelectOption(props) {


    function onChange(value) {
        // props.handleOption(value);
    }
    

    return (
        <Select
        showSearch
        style={{ width: "200px" }}
        placeholder="Select a Option"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="0">작동불가</Option>
        <Option value="1">출력오류</Option>
        <Option value="2">소모품 교체</Option>
        <Option value="3">기타</Option>
      </Select>
    )
}

export default SelectOption
