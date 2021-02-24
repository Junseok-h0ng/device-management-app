import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select,Row, Col} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import { addDeviceAction, addLocationAction } from '../../_actions/device_action';
import SelectLocation from './Sections/SelectMenu/SelectLocation';
import SelectOwner from './Sections/SelectMenu/SelectOwner';
import SelectSerialNumber from './Sections/SelectMenu/SelectSerialNumber';
import { loadJoinGroupActionRequest } from '../../_actions/group_actions';
const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};



class EditableTable extends React.Component {
  constructor(props) {

    super(props);
    this.columns = [
      {
        title: 'SerialNumber',
        dataIndex: 'serialNumber',
        width: '30%',
        editable:true,
        ellipsis:true
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        render:(_,record)=>(
          <SelectOwner record={record} handleOwner={this.handleOwner}/>
        ),
        ellipsis:true
      },
      {
        title: 'Location',
        dataIndex: 'location',
        render: (_, record) =>(
            <SelectLocation record={record} handleLocation={this.handleLocation} groupId={props.pid}/>
          ),
          ellipsis:true
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a><DeleteOutlined /></a>
            </Popconfirm>
          ) : null,
        ellipsis:true
      },
    ];
    this.state = {
      dataSource: [

      ],
      pid: props.pid,
      dispatch:props.dispatch,
      count:0
    };
  }

  handleSerialNumber = (record,newData)=>{
    const values = {serialNumber:newData};
    record.serialNumber = newData;
    this.handleSave({...record,...values});
  }

  handleOwner = (record,newData)=>{
    const values= {owner:newData};
    record.owner = newData;
    this.handleSave({...record,...values});
  }

  handleLocation = (record,newData) =>{
    const values = {location:newData};
    record.location = newData;
    this.handleSave({...record,...values});
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource,pid } = this.state;
    const newData = {
      key:count,
      serialNumber:'-',
      groupId:pid
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource ,pid,dispatch} = this.state;
    
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
        ,
      };
    });

    const onSubmit =()=>{
      const data = {
        groupId:pid,
        deviceInfo:dataSource
      }
      dispatch(addDeviceAction(data))
      window.location.reload();
    }
    return (

      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add a row
        </Button>
        <Form onFinish={onSubmit}>
          <Table

            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
          <Button style={{marginTop:'10px'}} htmlType="submit">수락</Button>
        </Form>
      </div>
    );
  }
}

function DeviceTable(props) {
    const dispatch = useDispatch();
    const [locationValue, setLocationValue] = useState("")
    useEffect(() => {
      dispatch(loadJoinGroupActionRequest({groupId:props.pid}))   
    }, [])
    const onSubmitLocation = () =>{
      const data = {
        groupId:props.pid,
        locationValue:locationValue
      }
      dispatch(addLocationAction(data));
      window.location.reload();
    }

    const handleLocationValue = (event) =>{
      setLocationValue(event.target.value);
    }

    return (
        <div>
            <div style={{marginBottom:'10px'}}>
            <Form onFinish={onSubmitLocation}>
              <Button type="primary" htmlType="submit">
                Add a Location
              </Button>
              <Input 
              style={{marginTop:'10px'}}
              value={locationValue}
              onChange={handleLocationValue}
              />
            </Form>
            </div>
            <EditableTable pid={props.pid} dispatch={dispatch}/>
        </div>
    )
}


export default DeviceTable;