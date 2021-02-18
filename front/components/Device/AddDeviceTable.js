import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select} from 'antd';
import {DeleteOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import { addDeviceAction } from '../../_actions/device_action';
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
        editable: true,
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        editable:true
      },
      {
        title: 'Location',
        dataIndex: 'location',
        editable:true
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
      serialNumber: 'null',
      owner: 'null',
      location: 'null',
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
          handleSave: this.handleSave,
        }),
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
    return (
        <div>
            <EditableTable pid={props.pid} dispatch={dispatch}/>
        </div>
    )
}


export default DeviceTable;