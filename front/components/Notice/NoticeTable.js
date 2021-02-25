import React,{useState} from 'react';
import {useSelector} from 'react-redux';
import { Form,Table, Button, Popover, Drawer, Input } from 'antd';
import Link from 'next/link';

function NoticeTable(props) {

  const {role} = useSelector(state=>state.user);
  const userData = useSelector(state=>state.user.data);
  const {isLoading} = useSelector(state=>state.notice);
  const notices = useSelector(state=>state.notice.data);
  
  const dataSource = [];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width:'60%',
      render: (text,record) => <Popover content={record.description} title={text}trigger="click"><a>{text}</a></Popover>,
      ellipsis:true
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      width:'20%',
      render:(text,record) =>{
        const author = userData._id === record.authorId;
        return author ?
        (
          <Link href={`./edit/${record.groupId}?noticeId=${record.id}`}><a>{text}</a></Link> 
        ):(
            text
          )
      },
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
        authorId:notice.author._id,
        author:notice.author.name,
        date:notice.updatedAt,
        groupId:props.groupId
      });
    });
    return(
      <Table loading={isLoading} dataSource={dataSource} columns={columns}/>  
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
