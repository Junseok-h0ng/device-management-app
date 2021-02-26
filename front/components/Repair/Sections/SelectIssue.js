import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
function SelectIssue(props) {


    function onChange(value) {
        props.handleIssue(value);
    }
    

    return (
        <Select
        showSearch
        style={{ width: "200px" }}
        placeholder="Select a Issue"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="작동불가">작동불가</Option>
        <Option value="출력오류">출력오류</Option>
        <Option value="소모품 교체">소모품 교체</Option>
        <Option value="기타">기타</Option>
      </Select>
    )
}

export default SelectIssue
