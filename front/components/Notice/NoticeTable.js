import React from 'react';
import {useSelector} from 'react-redux';
import { Table, Button, Popover } from 'antd';
import Link from 'next/link';

function NoticeTable(props) {

  const {role} = useSelector(state=>state.user);
  const notices = useSelector(state=>state.notice.data);
  
  const dataSource = [];


const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width:'60%',
      render: (text,record) => <Popover content={record.description} title={text} trigger="click"><a>{text}</a></Popover>,
      ellipsis:true
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width:'20%',
      ellipsis:true
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ellipsis:true
    },
  ];

  const drawTable = () =>{
    notices.map((notice,index)=>{
      dataSource.push({
        key:index,
        id:notice._id,
        title:notice.title,
        description:notice.description,
        author:notice.author,
        date:notice.updatedAt
      });
    });
    return(
      <Table dataSource={dataSource} columns={columns}/>  
    )
    
  }

    return (
        <div>
            {notices &&
              <div>
              {role === 'owner' || role === 'admin' ?
                <Button><Link href={`./add/${props.groupId}`}><a>Add a Notice</a></Link></Button>
              : null
              }
              {drawTable()}
               </div>
            }
        </div>
    )
}

export default NoticeTable
