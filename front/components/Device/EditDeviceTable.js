import React, { useState,useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { deviceListAction } from '../../_actions/device_action';
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
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const {deviceList} = useSelector(state=>state.device);

  useEffect(() => {
    if(deviceList != null){
      const originData = [];
      for (let i = 0; i < deviceList.length; i++) {
        originData.push({
          key: i.toString(),
          serialNumber: deviceList[i].serialNumber,
          owner: deviceList[i].owner,
          location: deviceList[i].location,
        });
      }
      setData(originData);
    }
  }, [deviceList])
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
      width: '30%',
      editable: false,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      width: '40%',
      editable: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      width: '15%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
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
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
    return (
      <Form form={form} >
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



function EditDeviceTable(props) {
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.device);

  useEffect(() => {
       dispatch(deviceListAction({groupId:props.pid}));
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

export default EditDeviceTable
