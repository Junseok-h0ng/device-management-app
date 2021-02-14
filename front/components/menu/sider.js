import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import Link from 'next/link'
import {useRouter} from 'next/router'
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
    const router = useRouter();
    const {route} = router;
    const selected = route.split('/')[1];
    const [selectedMenu, setSelectedMenu] = useState('0');
    useEffect(() => {
        switch(selected){
            case 'group':
                setSelectedMenu('1');
                break;
            case 'device':
                setSelectedMenu('2');
                break;
            case 'repaire':
                setSelectedMenu('3');
                break;
            case 'team':
                setSelectedMenu('4');
                break;
            case 'notice':
                setSelectedMenu('5');
                break;
            default:
                setSelectedMenu('0');
                break;
        }
    }, [selected])

    const ownerMenu = (
        <>
            <Menu.Item key="1" icon={<GroupOutlined />}><Link href={`/group/${connected}`}><a>Group</a></Link></Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}><Link href={`/device/${connected}`}><a>Device</a></Link></Menu.Item>
            {/* <Menu.Item key="3" icon={<ToolOutlined />}><Link><a>Repair</a></Link></Menu.Item> */}
            <Menu.Item key="4" icon={<TeamOutlined />}><Link href={`/team/${connected}`}><a>Team</a></Link></Menu.Item>
            <Menu.Item key="5" icon={<InfoOutlined />}>Notice</Menu.Item>
        </>
    )
    const memberMenu = (
        <>
            <Menu.Item key="1" icon={<GroupOutlined />}><Link href={`/group/${connected}`}><a>Group</a></Link></Menu.Item>
            {/* <Menu.Item key="3" icon={<ToolOutlined />}><Link><a>Repair</a></Link></Menu.Item> */}
            <Menu.Item key="5" icon={<InfoOutlined />}>Notice</Menu.Item>
        </>
    )

    

    const {Sider} = Layout;
    return (
        <Sider collapsed>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedMenu}>
            <Menu.Item key="0" icon={<HomeOutlined />}>
            <Link href="/"><a>Home</a></Link>
            </Menu.Item>
            {role === 'owner' ? 
                ownerMenu
            :role === 'admin' ?
                ownerMenu
            :role === 'member' ?
                memberMenu
            :
                ''
            }
        </Menu>
        </Sider>
    )
}

export default sider
