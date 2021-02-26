import React, { useState ,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { loadRepairAction } from '../../_actions/repair_action';
import Loading from '../util/Loading';


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [checked,setChecked] = useState(false);


  const {list} = useSelector(state=>state.repair);
  const originData = [];

  useEffect(() => {
    if(list != null){
      const originData = [];
      for (let i = 0; i < list.length; i++) {
        originData.push({
          key: i.toString(),
          serialNumber: list[i].deviceId.serialNumber,
          location: list[i].deviceId.location,
          issue: list[i].issue,
          explain: list[i].explain,
          done:list[i].done
        });
      }
      setData(originData);
    }
  }, [list])

  
  const isEditing = (record) => record.key === editingKey;
  const isChecked = (record) => {
    setChecked(data[record.key].done);
  }
  const handleChecked = () =>{
    setChecked(!checked);
  } 

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };



  const columns = [
    {
      title: 'SerialNumber',
      dataIndex: 'serialNumber',
      width: '25%',
      ellipsis:true
    },
    {
      title: 'Location',
      dataIndex: 'location',
      width: '15%',
      ellipsis:true
    },
    {
      title: 'Issue',
      dataIndex: 'issue',
      width: '20%',
      ellipsis:true
    },
    {
      title:'Explain',
      dataIndex:'explain',
      ellipsis:true
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width:'10%',
      render: (_, record) => {
        const editable = isEditing(record);
        isChecked(record);
        return editable ? (
          <span>
            {/* 체크박스를 섹션으로 만들어서 해보자 */}
            <Checkbox checked={checked} onChange={handleChecked}>fixed</Checkbox>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        checked: col.dataIndex,
        editing: isEditing(record),
      }),
    };
  });
  return(
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

function AdminForm(props) {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state=>state.repair);
  useEffect(() => {
    dispatch(loadRepairAction({groupId:props.groupId}));
  }, [])
  
    return (
        <div>
            {isLoading ?
              <Loading/>
            :
              <EditableTable/>
            }
            
        </div>
    )
}

export default AdminForm
