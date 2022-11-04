import styled from 'styled-components'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'
import { uuid, formatStringToUppercase } from '@/utils'

const MainContent = styled.div``

const ComD3Force = (props: any) => {
    const width: number = props.width || 0
    const height: number = props.height || 0
    const textPadding = 5 // 文字与方框间距,注：固定值5
    const rectMinWidth = 50 // 节点方框默认最小，
    const circleR = 8 // 圆圈半径
    const rootName: string = '根节点'
    const duration = 750 // 动画持续时间]
    const rootNameFontSize = 12
    const colors: any = {
        'exchange': {
            'fill': '#8D48E3',
            'stroke': '#b8a8cc'
        },
        'contract': {
            'fill': '#868F9A',
            'stroke': '#868F9A'
        },
        'EOA': {
            'fill': '#3AC89F',
            'stroke': '#1B3539'
        },
        'eoa': {
            'fill': '#3AC89F',
            'stroke': '#1B3539'
        },
        'main address': {
            'fill': '#4583FF',
            'stroke': '#4d6ba8'
        },
        'bridge,': {
            'fill': '#17BAD4',
            'stroke': '#CFF0F5'
        },
        'tokenContract': {
            'fill': '#F3832F',
            'stroke': '#887e76'
        },
        'high-risk': {
            'fill': 'red',
            'stroke': '#f2a0b9'
        }
    }
    const simulationContent: any = useRef({
        forceSimulation: {},
        simulationSvg: {},
        simulationLinks: {},
        simulationNodes: {},
        simulationPashText: {}
    })
    const treeData: any = {
        up: {
            name: "前端",
            "prop": "web",
            "url": 'https://blog.csdn.net/weixin_41192489/category_9421858.html',
            "link": "博客",
            "children":[
                {
                    name: "编程语言",
                    "prop": "codeType",
                    "disabled": true,
                    "children": [
                        {
                            name: "HTML",
                            "prop": "HTML",
                        },
                        {
                            name: "CSS",
                            "prop": "CSS",
                        },
                        {
                            name: "Javascript",
                            "prop": "Javascript",
                        },
                    ]
                },
                {
                    name: "JS框架",
                    "prop": "jsFrame",
                    "disabled": true,
                    "children":
                        [
                            {
                                name: "Vue",
                                "prop": "Vue",
                            },
                            {
                                name: "React",
                                "prop": "React",
                            },
                            {
                                name: "Angular",
                                "prop": "Angular",
                                dicType: 'doc'
                            },
                        ]
                },
                {
                    name: "UI框架",
                    "prop": "uiFrame",
                    "disabled": true,
                    "url": '',
                    "children": [
                        {
                            name: "Element UI",
                            "prop": "element_ui",
                            "url": 'https://element.eleme.cn/#/zh-CN/component/i18n',
                            "link": "官网",
                        },
                        {
                            name: "iview UI",
                            "prop": "iview UI",
                            "url": 'http://v1.iviewui.com/docs/introduce',
                            "link": "官网",
                        },
                        {
                            name: "layUI",
                            "prop": "layUI",
                            "url": 'https://www.layui.com/doc/',
                            "link": "官网",
                        },
                        {
                            name: "Ant Design",
                            "prop": "Ant Design",
                            "url": 'https://www.antdv.com/docs/vue/introduce-cn/',
                            "link": "官网",
                        }
                    ]
                },
            ]
        },
        down: {
            name: "后端",
            "prop": "server",
            "url": 'https://blog.csdn.net/weixin_41192489/category_11044490.html',
            "link": "博客",
            "children": [
                {
                    name: "编程语言",
                    "prop": "codeType",
                    disabled: true,
                    "children": [
                        {
                            name: "Node.js",
                            "prop": "nodejs",
                            dicType: 'doc'
                        },
                        {
                            name: "Java",
                            "prop": "java",
                        },
                    ]
                },
                {
                    name: "框架",
                    "prop": "frame",
                    disabled: true,
                    "children": [
                        {
                            name: "Koa2",
                            "prop": "koa2",
                        },
                    ]
                },
                {
                    name: "数据库",
                    "prop": "database",
                    disabled: true,
                    "children": [
                        {
                            name: "Redis",
                            "prop": "Redis",
                            dicType: 'doc'
                        },
                        {
                            name: "MongoDB",
                            "prop": "MongoDB",
                            dicType: 'doc'
                        },
                        {
                            name: "MySQL",
                            "prop": "MySQL",
                            dicType: 'doc'
                        },
                    ]
                },
            ]
        }
    }
    const direction = ['up', 'down'] // 分为上下两个方向 'upward', 'downward' ['r', 'l']
    // 上下两块块数据源
    let root: any = { up: {}, down: {}}

    useEffect(() => {
        if (width && height) {
            initData()
        }
    }, [width, height])

    const initData = () => {
        initSvg()
    }

    // 初始化svg
    const initSvg = () => {
        simulationContent.current.simulationSvg = d3.select(`.svg-tree-content`).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr('viewBox', [0, 0, width, height])
            d3.selectAll("g").remove()
        // g标签 容器svg>g
        const container: any = simulationContent.current.simulationSvg.append('g')
            .attr('class', "container")
            .attr('transform', `translate(0, 0) scale(1)`)
        bindSvgHander(simulationContent.current.simulationSvg)
        drawRoot(container)
        dealData(container)
    }

    // 画出根节点
    const drawRoot = (container: any) => {
        const fontSize = 20 // 跟节点字体大小
        const rootNodeLength = rootName.length * fontSize + 30 //根节点字符所占宽度
        const title = container.append('g')
            .attr('id', "rootTitle")
            .attr('class', "rootTitle")
            .attr("transform", `translate(${width / 2}, ${height / 2})`)
            .style('cursor', 'pointer')
            .on("click", (event: any, d: any) => {
                event.stopPropagation()
                nodeClick(d) // 节点点击事件
            })

        title.append('svg:rect')
            .attr('fill', '#1B3539')
            .attr('stroke','#3CC89F')
            .attr("y", -27)
            .attr("x", -(rootNodeLength / 2))
            .attr("width", rootNodeLength)
            .attr("height", 40)
        
        title.append('text')
            .attr('fill', '#3CC89F')
            .attr('x', -(rootNodeLength / 4 - 5))
            .attr('y', 0)
            .attr('font-weight', 'bold')
            .attr('font-size', fontSize)
            .text(rootName)
    }

    // 数据处理
    const dealData = (container: any) => {
        root = { 
            up: d3.hierarchy(treeData.up), 
            down: d3.hierarchy(treeData.down)
        } 
        direction.forEach((item: string) => {
            root[item].x0 = width / 2  // 根节点x坐标
            root[item].y0 = height / 2 // 根节点Y坐标
            root[item].descendants().forEach((d: any) => {
                d._children = d.children // 添加_children属性，用于实现点击收缩及展开功能
                d.id = item + uuid() // 绑定唯一标识ID
                collapse(d, item)
            })
            update(root[item], item, container)
        })
    }

    // 开始绘图
    const update = (source: any, direction: string, container: any) => {
        const config = getTreeConfig()
        const offsetX = -config.centralWidth
        const dirRight = direction === 'down' ? 1 : -1 // 方向为右/左
        const node_class = direction + 'Node'
        const className = `${direction}gNode`
        const tree: any = d3.tree().nodeSize([width, height]).separation((a: any,b: any) => {
            return a.parrent == b.parrent ? .12 : .1
        })
        const rootData:any = tree(source)
        const links = rootData.links() // 返回当前 node 的 links 数组, 其中每个 link 定义了 source父节点, target 子节点属性。
        const nodes = rootData.descendants() // 返回后代节点数组，第一个节点为自身，然后依次为所有子节点的拓扑排序
        console.log('nodes==', nodes)
        nodes.forEach((d: any) => {
            //左右2部分，设置以中心点为圆点(默认左上角为远点)
            d.y = dirRight * (d.depth * config.linkLength) + config.centralHeight
            d.x = d.x - offsetX
            if (d.name == rootName) {
                d.x = config.centralWidth
                d.y += dirRight * 0 // 上下两树图根节点之间的距离
            }
        })

        //根据class名称获取左或者右的g节点，达到分块更新
        const node = container.selectAll('g.' + node_class).data(nodes, (d: any) => {
            return d.id
        })
        
        //新增节点，tree会根据数据内的children扩展相关节点
        const nodeEnter = node.enter().append('g')
            .attr('class', node_class)
            .attr('id', (d: any) => { //给g元素添加id属性
                return 'g' + d.id
            })
            .attr('transform', (d: any) => {
                return `translate(${source.x0}, ${source.y0})`
            })
            .style('cursor', (d: any) => {
                return (d.grade == rootName) ? '' : (d.children || d._children) ? 'pointer' : '';
            })

        nodeEnter.each((d: any) => {
            if (d.depth > 0) { // 非根节点且无子节点
                drawRect(d,  dirRight) // 画方框
                drawText(d, dirRight) // 画文本
                updateRectWidth(d)
            }
            if (d.depth > 0 && d.data.children) { // 非根节点且有子节点
                const width = dirRight > 0 ? 75 : 15
                drawCircle(d, direction, source, container) // 画圆圈
                d3.select(`#g${d.id} g`).attr('transform', `translate(0, ${width})`) //修改圆圈属性
            }
        })

        // 更新节点：节点enter和exit时都会触发tree更新
        const nodeUpdate = node.merge(nodeEnter).transition().duration(duration)
            .attr("transform", (d: any) => `translate(${d.x}, ${d.y - dirRight * rectMinWidth / 2})`)
            .attr("fill-opacity", 1)
            .attr("stroke-opacity", 1)

        // 移除节点:tree移除掉数据内不包含的节点(即，children = false)
        const nodeExit = node.exit().transition().duration(duration).remove()
            .attr("transform", (d: any) => `translate(${source.x},${source.y})`)
            .attr("fill-opacity", 0)
            .attr("stroke-opacity", 0)
        
        // Update the links 根据 className来实现分块更新
        const link = container.selectAll(`path.${className}`).data(links, (d: any) => d.target.id)
        
        // Enter any new links at the parent's previous position.
        // insert是在g标签前面插入，防止连接线挡住G节点内容
        const linkEnter = link.enter().insert("path", 'g')
            .attr('class', className)
            .attr("fill", 'none')
            .attr("stroke-width", 2)
            // .attr('stroke', '#fff')

        // Transition links to their new position.
        // link.merge(linkEnter).transition().duration(duration).attr("d", diagonal)
        link.merge(linkEnter).transition().duration(duration).attr("d", (d: any) => {
            return diagonal(d, dirRight)
        })

        // Transition exiting nodes to the parent's new position.
        link.exit().transition().duration(duration).remove()
            .attr("d", (d: any) => {
                const o = { x: source.x, y: source.y }
                return diagonal({ 
                    source: o, 
                    target: o,
                }, dirRight)
            })

        // Stash the old positions for transition.
        root[direction].eachBefore((d: any) => {
            d.x0 = d.x
            d.y0 = d.y
        })
    }

    // 根据文本的内容动态设置rect矩形的宽度
    const updateRectWidth = (node: any) => {
        const id: string = `g${node.id}`
        const textEl: any = document.getElementById(`text${id}`)
        const textWidth = textEl.getBBox().width
        d3.select(`#rect${id}`)
            .attr('width', textWidth + 30)
            .attr("x", -(textWidth / 2 + 15))
        
        d3.select(`#text${id}`)
            .attr("x", -(textWidth / 2))    
        
    }

    //画方框
    const drawRect = (node: any, dirRight: number) => {
        const id: string = `g${node.id}`
        return d3.select(`#${id}`).append('rect')
            .attr('class', (d: any) => {
                if (node.depth === 1) {
                    return 'oneDeep'
                } else if (node.data.name === 'Expand All') {
                    return 'expandAll'
                } else if (node.data.children) {
                    return 'childDeep'
                } else {
                    return 'noChildDeep' // "#2E3138" transparent
                }
            })
            .attr('id', `rect${id}`)
            .attr('y', textPadding + 20)
            .attr("height", 40)
            .attr('rx', 0)
            .style('cursor', 'pointer')
            .on("click", (event: any, d: any) => {
                event.stopPropagation()
                if (d.depth === 1 || d.data.children) {
                    clickNode(d, 'cluster') // 节点点击事件
                } else {
                    if (d.data.name === 'Expand All') {
                        clickNode(d, 'expandAll') // 节点点击事件
                    } else {
                        clickNode(d, 'address') // 节点点击事件
                    }
                }
            })
    }

    //画文本
    const drawText = (node: any, dirRight: number) => {
        const id: string = `g${node.id}`
        return d3.select(`#${id}`).append("text")
            .attr('id', `text${id}`)
            .attr('y', (textPadding + 44))
            .attr('text-anchor', dirRight ? 'start' : 'end')
            .style('font-size', rootNameFontSize)
            .text((d: any) => {
                if (d.data.children) {
                    return formatStringToUppercase(d.data.name)
                } else {
                    if (d.data.name === 'Expand All') {
                        return d.data.name
                    } else {
                        return `${d.data.name.substring(0, 3)}...${d.data.name.substring(d.data.name.length - 3)}`
                    }
                }
            })
            .style('cursor', 'pointer')
            .on("click", (event: any, d: any) => {
                event.stopPropagation()
                if (d.depth === 1 || d.data.children) {
                    clickNode(d, 'cluster') // 节点点击事件
                } else {
                    if (d.data.name === 'Expand All') {
                        clickNode(d, 'expandAll') // 节点点击事件
                    } else {
                        clickNode(d, 'address') // 节点点击事件
                    }
                }
            })
    }

    // 画circle
    const drawCircle = (node: any, direction: string, source: any, container: any) => {
        const id: string = `g${node.id}`

        let gMark = d3.select(`#${id}`).append('g')
            .attr('class', 'node-circle')
            .attr("stroke", (d: any) => d.depth >= 1 ? '#4583FF' : '#fff')
            .attr('stroke-width', 2)
            .on('click', (d: any) => {
                circleClick(d, direction, source, id, container)
            })

        gMark.append("circle")
            .attr('fill', '#574F3B')
            .attr("r", (d: any) => d.depth === 0 ? 0 : circleR) // 根节点不设置圆圈

        let padding = circleR - 2
        gMark.append('path')
            .attr('class', 'pathCircle')
            .attr('d', (d: any) => d.depth >= 1 ? 'M0,-6 V6 M-6,0 H6' : `m -${padding} 0 l ${2 * padding} 0`) //横线

        gMark.append('path')//竖线，根据展开/收缩动态控制显示
            .attr('class', 'pathCircle')
            .attr('d', (d: any) => d.depth >= 1 ? 'M0,-6 V6 M-6,0 H6' : `m 0 -${padding} l 0 ${2 * padding}`)
            .attr('stroke-width', 0)
            .attr('class', 'node-circle-vertical')
        return gMark
    }

    //画连接线
    const diagonal = (obj: any, dirRight: number) => {
        const s = obj.source
        const t = obj.target
        const myH = dirRight > 0 ? s.y : s.y + 50
        const syH = dirRight > 0 ? (s.y + (t.y - s.y) / 2) : (s.y + (t.y - s.y) / 2)
        const yH = dirRight > 0 ? t.y : t.y + 50
        
        return "M" + (s.x) + "," + myH + "L" + s.x + "," + syH + "L" + t.x + "," +
        syH + "L" + (t.x) + "," + yH
    }

    const getTreeConfig = () => {
        let treeConfig: any = {
            'margin': {
                'top': 10,
                'right': 5,
                'bottom': 0,
                'left': 30
            }
        }
        treeConfig.chartWidth = width
        treeConfig.chartHeight = height
        treeConfig.centralHeight = treeConfig.chartHeight / 2
        treeConfig.centralWidth = treeConfig.chartWidth / 2
        treeConfig.linkLength = 150
        treeConfig.duration = 0 // 动画时间
        return treeConfig
    }

    // 节点点击事件
    const clickNode = (node: any, type: string) => {
        console.log('clickNode node===', node)
        props.showDetailInfo(node, type)
    }

    // 根据当前节点是否有children来判断是展开还是收缩，true收缩，false展开 //tree会根据节点内是否有children来向下扩展
    const circleClick = (node: any, direction: string, source: any, id: string, container:any) => {
        const __data__: any = node.srcElement.__data__
        const data: any = __data__.data
        console.log('__data__==', __data__)
        console.log('data===', data)
        if (!__data__._children && !__data__.children && !data.children ) {//无子节点
            return
        }
        __data__.children = __data__.children ? null : __data__._children
        
        d3.select(`#${id} .node-circle`)
            .attr('fill', __data__.children ? '#fff' : '#4583FF')
            .attr('stroke', __data__.children ? '#fff' : '#4583FF')

        d3.select(`#${id} .node-circle .pathCircle`)
            .transition().duration(duration)
            .attr('d', __data__.children ? 'm -6 0 l 12 0' : 'M0,-6 V6 M-6,0 H6')
            
        update(source, direction, container)
    }

    // 折叠跟节点的所有子节点
    const collapse = (d: any, item: string) => {
        if (d.children) {
            d._children = []
            d.children.forEach((item: any) => {
                d._children.push(item)
            })
            d.id = item + uuid() // 绑定唯一标识ID
            if (d.depth >= 1) {
                d.children = null
            }
        }
    }

    // 为这个svg绑定缩放事件
    const bindSvgHander = (svgContainer: any) => {
        svgContainer.call(
            d3
                .zoom() // 创建一个新的缩放行为
                .scaleExtent([.1, 5]) // 限制缩放范围
                .on("zoom", (d:any) => {
                    svgContainer.selectAll("g") // #buildLineId, #buildNodeId
                        .attr(
                            "transform", // svg下的g标签移动大小
                            `translate(${d.transform.x},${d.transform.y})scale(${d.transform.k})`
                        )  
                })
        ).on('dblclick.zoom', null)
    }

    // 边上添加文本
    const drawPathText = (linkG: any) => {
        linkG.append("text")
            .attr('id', (d: any) => {
                return `text-${d.source.address}-${d.target.address}`
            })
            .attr('class', (d: any) => {
                if (d.light) {
                    return 'text-light'
                } else {
                    return 'no-light'
                }
            })
            .attr('text-anchor', 'middle')
            .attr('fill', '#979797')
            .append('textPath')
            .attr('xlink:href', (d: any) => {
                return `#pathText-${d.source.address}-${d.target.address}`
            })
            .attr('cursor', 'pointer')
            .attr('startOffset', '50%')
            .attr('font-size', (d: any) => {
                if (d.type && d.type.length && d.type.length > 1) {
                    return 10
                } else {
                    return 12
                }
            })
            .text((d: any) => {
                if (d.type && d.type.length && d.type.length > 1) {
                    return 'Multiple Relationships'
                } else {
                    let type: string = d.type && d.type.length ? d.type.join(' ')  : ''
                    return type ? type.substring(0, 10) : ''
                }
            })
            .on('mouseover', (event: any, link: any) => {
                event.stopPropagation()
            })
            .on('mouseleave', (event: any, link: any) => {
                event.stopPropagation()
            })
            .on('click', (event: any, link: any) => {
                event.stopPropagation()
            })
    }

    // 单击节点点击事件
    const nodeClick = (node: any) => {
        const address: string = node.address
    }

    /**
     * 节点（开始）拖拽事件
    */
    const dragstarted = (event:any, d: any) => {
        if (!event.active) simulationContent.current.forceSimulation.alphaTarget(0.002).restart();
        d.fx = d.x
        d.fy = d.y
    }
    
    /**
     * 节点拖拽事件
    */
    const dragged = (event:any, d: any) => {
        d.fx = event.x
        d.fy = event.y
    }

    /**
     * 节点（结束）拖拽事件
    */
    const dragended = (event:any, d: any) => {
        if (!event.active) simulationContent.current.forceSimulation.alphaTarget(0)
        simulationContent.current.forceSimulation.stop()
    }

    return (
        <MainContent className='svg-tree-content'>

        </MainContent>
    )
}

export default ComD3Force