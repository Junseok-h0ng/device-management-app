import React, { useState ,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Table, Form,Button } from 'antd';
import { loadRepairAction, repairCompleteAction } from '../../_actions/repair_action';
import Loading from '../Util/Loading';


const EditableTable = () => {
  const [data, setData] = useState(originData);
  const [checkDevice, setCheckDevice] = useState([]);
  const dispatch = useDispatch();
  const {list} = useSelector(state=>state.repair);
  const originData = [];

  useEffect(() => {
    if(list != null){
      const originData = [];
      for (let i = 0; i < list.length; i++) {
          originData.push({
            key: i.toString(),
            id:list[i]._id,
            serialNumber: list[i].deviceId.serialNumber,
            location: list[i].deviceId.location,
            issue: list[i].issue,
            explain: list[i].explain,
          });
      }
      setData(originData);
    }
  }, [list])

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setCheckDevice(selectedRows);
    }
  };

  const onSubmit = () =>{
    dispatch(repairCompleteAction(checkDevice));
    window.location.reload();
  }



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
  ];


  const [selectionType] = useState('checkbox');

  return(
    <Form onFinish ={onSubmit}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        bordered
        dataSource={data}
        columns={columns}
      />
      <Button htmlType="submit">확인</Button>
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
