import React, { useState,useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import { deviceEditAction, deviceListAction, editDeviceAction } from '../../_actions/device_action';
import Loading from '../util/Loading';
import SelectLocation from './Sections/SelectMenu/SelectLocation';
import SelectOwner from './Sections/SelectMenu/SelectOwner';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  handleLocation,
  handleOwner,
  ...restProps
}) => {
  const inputNode = inputType === 'owner' ? <SelectOwner record={record} handleOwner={handleOwner}/> : <SelectLocation record={record} handleLocation={handleLocation}/>;
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

const EditableTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const dispatch = useDispatch();
  const isEditing = (record) => record.key === editingKey;
  const {deviceList} = useSelector(state=>state.device);
  const [editOwner, setEditOwner] = useState("");
  const [editLocation, setEditLocation] = useState("");

  const handleOwner = (record,newData)=>{
    setEditOwner(newData);
  }

  const handleLocation = (record,newData) =>{
    setEditLocation(newData);
  }


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
  }, [deviceList]);

  const edit = (record) => {
    form.setFieldsValue({
      serialNumber: '',
      owner: '',
      location: '',
      ...record,
    });
    setEditLocation(record.location);
    setEditOwner(record.owner);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = {
        owner: editOwner,
        location: editLocation
      }
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
      editable: false,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      editable: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      editable:true,
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
        inputType: col.dataIndex === 'owner' ? 'owner' : 'location',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        handleLocation: handleLocation,
        handleOwner: handleOwner
      }),
    };
  });
  const onSubmit = () =>{
    dispatch(editDeviceAction({deviceList: data}));
    window.location.reload();
  }
    return (
      <Form form={form} onFinish={onSubmit}>
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
        <Button htmlType="submit" type="primary">저장</Button>
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

