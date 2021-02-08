import React from 'react';
import {useSelector} from 'react-redux';
import Link from 'next/link'
import { Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    InfoOutlined,
    ToolOutlined,
    TeamOutlined,
    GroupOutlined
  } from '@ant-design/icons';

function sider() {
    const {role} = useSelector(state=>state.user);
    const {connected} = useSelector(state=>state.group);
    const adminMenu = (
        <>
            <Menu.Item key="1" icon={<GroupOutlined />}><Link href={`/group/${connected}`}><a>Group</a></Link></Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}><Link href={`/device/${connected}`}><a>Device</a></Link></Menu.Item>
            {/* <Menu.Item key="3" icon={<ToolOutlined />}><Link><a>Repair</a></Link></Menu.Item> */}
            <Menu.Item key="4" icon={<TeamOutlined />}><Link href={`/team/${connected}`}><a>Team</a></Link></Menu.Item>
            <Menu.Item key="5" icon={<InfoOutlined />}>Notice</Menu.Item>
        </>
    )

    

    const {Sider} = Layout;
    return (
        <Sider collapsed>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
            <Menu.Item key="0" icon={<HomeOutlined />}>
            <Link href="/"><a>Home</a></Link>
            </Menu.Item>
            {role === 'owner' && 
                adminMenu
            }
        </Menu>
        </Sider>
    )
}

export default sider
