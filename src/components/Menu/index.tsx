import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons'
import RouteLink from './routeLink'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ComMenu = () => {
    const location:any = useLocation()
    const pathname: string = location.pathname || ''
    const [selectedKeys, setSelectedKeys] = useState([''])
    const [collapsed, setCollapsed] = useState(false)
    const [menuWidth, setMenuWidth] = useState(256)
    const items: any[] = [
        { 
            key: '/title1',
            label: (
                <RouteLink
                    defaultSelectedKeys=''
                    defaultKey='/title1'
                    to='/title1'
                    normalIcon=''
                    activeIcon=''
                    title='title 1'
                    isShowIcon={false}
                />
            ),
            icon: <AppstoreOutlined />,
        },
        {
            key: '/title2',
            label: 'title 2',
            icon: <MailOutlined />,
            children: [
                { 
                    key: '/title2-1',
                    label: (
                        <RouteLink
                            to='/title2-1'
                            normalIcon=''
                            activeIcon=''
                            title='子菜单项1'
                            isShowIcon={false}
                        />
                    ), 
                    icon: <AppstoreOutlined />,
                },
                    
                { 
                    key: '/title2-2',
                    label: (
                        <RouteLink
                            to='/title2-2'
                            normalIcon=''
                            activeIcon=''
                            title='子菜单项2'
                            isShowIcon={false}
                        />
                    ), 
                    icon: <AppstoreOutlined />,
                }
            ],
        },
        {
            key: '/d3',
            label: 'D3',
            icon: <SettingOutlined />,
            children: [
                { 
                    key: '/force',
                    label: (
                        <RouteLink
                            to='/force'
                            normalIcon=''
                            activeIcon=''
                            title='force'
                            isShowIcon={false}
                        />
                    ), 
                    icon: <AppstoreOutlined />,
                },
                    
                { 
                    key: '/tree',
                    label: (
                        <RouteLink
                            to='/tree'
                            normalIcon=''
                            activeIcon=''
                            title='tree'
                            isShowIcon={false}
                        />
                    ), 
                    icon: <AppstoreOutlined />,
                }
            ],
        }
    ]

    useEffect(() => {
        if (pathname) {
            setSelectedKeys([pathname])
        }
    }, [pathname])
    
    

    const itemClick = (item: any) => {
        console.debug('click==', item)
        // let isCollapsed = !collapsed
        // if (isCollapsed) {
        //     setMenuWidth(40)
        // } else {
        //     setMenuWidth(256)
        // }
        // setCollapsed(isCollapsed)
    }

    return (
        <Menu
            onClick={itemClick}
            style={{width: menuWidth}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={[]}
            selectedKeys={selectedKeys}
            inlineCollapsed={collapsed}
            mode="inline"
            items={items}
        />
    )
}

export default ComMenu