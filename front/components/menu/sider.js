import React from 'react'

import Link from 'next/link'
import { Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    InfoOutlined,
    ToolOutlined,
    TeamOutlined
  } from '@ant-design/icons';

function sider() {

    const {Sider} = Layout;

    return (
        <Sider collapsed>
        <div className="logo" />
        <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/"><a>Home</a></Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
            Device
            </Menu.Item>
            <Menu.Item key="3" icon={<ToolOutlined />}>Repair</Menu.Item>
            <Menu.Item key="6" icon={<TeamOutlined />}>Team</Menu.Item>
            <Menu.Item key="9" icon={<InfoOutlined />}>Notice</Menu.Item>
        </Menu>
        </Sider>
    )
}

export default sider
