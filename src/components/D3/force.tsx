import styled from 'styled-components'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

const MainContent = styled.div`
    width: 100%;
    height: 100%;
`

const ComD3Force = (props: any) => {
    const width: number = props.width || 0
    const height: number = props.height || 0
    const defaultAddress: string = '0x0000000000488b7147b38452e686b41c4fa8bedc'
    const nodes: any[] = [
        {
            "address": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "type": "EOA", 
            "tag": "dm-me-on-twitter-my-username-is-robertjfclarke.eth", 
            "light": true
        }, 
        {
            "address": "0xa21b4397775ffc198974af3b3040b71012912193", 
            "type": "EOA", 
            "tag": null, 
            "light": false
        }, 
        {
            "address": "0x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
            "type": "EOA", 
            "tag": null, 
            "light": false
        }, 
        {
            "address": "0xab5801a7d398351b8be11c439e05c5b3259aec9b", 
            "type": "EOA", 
            "tag": "Vitalik", 
            "light": false
        }, 
        {
            "address": "0x98db427092018b71b10a712988b4510669eb0ec9", 
            "type": "EOA", 
            "tag": "mfermarcus.eth", 
            "light": false
        }, 
        {
            "address": "0x6903585ab8630b500417c2af3cbb7394756d6c62", 
            "type": "high-risk", 
            "tag": null, 
            "light": true
        }, 
        {
            "address": "0x0000000000488b7147b38452e686b41c4fa8bedc", 
            "type": "main address", 
            "tag": "punkfractions.eth", 
            "light": true
        }, 
        {
            "address": "0x577c2d035a6f8d69485b772558477cfc3b87ec7b", 
            "type": "EOA", 
            "tag": null, 
            "light": false
        }, 
        {
            "address": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": "EOA", 
            "tag": "serialtrade.eth", 
            "light": true
        }
    ]
    const links: any[] = [
        {
            "source": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "target": "0x0000000000488b7147b38452e686b41c4fa8bedc", 
            "type": [
                "ens", 
                "transfer"
            ], 
            "edgeIds": [
                "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 1, 
            "light": true
        }, 
        {
            "source": "0x0000000000488b7147b38452e686b41c4fa8bedc", 
            "target": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "type": [
                "ens", 
                "transfer"
            ], 
            "edgeIds": [
                "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 1, 
            "light": true
        },
        {
            "source": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "target": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": [
                "transfer", 
                "assertsMovement"
            ], 
            "edgeIds": [
                "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x00ca000000cc8411d52d6045c82c7984033e0000", 
                "asserts_movement_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x00ca000000cc8411d52d6045c82c7984033e0000"
            ], 
            "transferMaxCount": 4, 
            "transferOverCount": 1, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 1, 
            "bothOwnedEnsCount": 0, 
            "light": true
        }, 
        {
            "source": "0x6903585ab8630b500417c2af3cbb7394756d6c62", 
            "target": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0x6903585ab8630b500417c2af3cbb7394756d6c620x00ca000000cc8411d52d6045c82c7984033e0000"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 1, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": true
        }, 
        {
            "source": "0x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
            "target": "0x0000000000488b7147b38452e686b41c4fa8bedc", 
            "type": [
                "transfer", 
                "assertsMovement"
            ], 
            "edgeIds": [
                "transfer_0x629d6688dd4546da8935ee1602be62d92b3c5a7c0x0000000000488b7147b38452e686b41c4fa8bedc", 
                "asserts_movement_0x629d6688dd4546da8935ee1602be62d92b3c5a7c0x0000000000488b7147b38452e686b41c4fa8bedc"
            ], 
            "transferMaxCount": 3, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 3, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "target": "0x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
            "type": [
                "transfer", 
                "ens"
            ], 
            "edgeIds": [
                "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
                "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x629d6688dd4546da8935ee1602be62d92b3c5a7c"
            ], 
            "transferMaxCount": 77, 
            "transferOverCount": 26, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 14, 
            "light": false
        }, 
        {
            "source": "0xab5801a7d398351b8be11c439e05c5b3259aec9b", 
            "target": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0xab5801a7d398351b8be11c439e05c5b3259aec9b0x8ae1713594c61e2b26fef4b03a7a39fa6f296734"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0xab5801a7d398351b8be11c439e05c5b3259aec9b", 
            "target": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0xab5801a7d398351b8be11c439e05c5b3259aec9b0x00ca000000cc8411d52d6045c82c7984033e0000"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0xa21b4397775ffc198974af3b3040b71012912193", 
            "target": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0xa21b4397775ffc198974af3b3040b710129121930x8ae1713594c61e2b26fef4b03a7a39fa6f296734"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0xa21b4397775ffc198974af3b3040b71012912193", 
            "target": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": [
                "assertsMovement", 
                "ens", 
                "transfer"
            ], 
            "edgeIds": [
                "asserts_movement_0xa21b4397775ffc198974af3b3040b710129121930x00ca000000cc8411d52d6045c82c7984033e0000", 
                "ens_0xa21b4397775ffc198974af3b3040b710129121930x00ca000000cc8411d52d6045c82c7984033e0000", 
                "transfer_0xa21b4397775ffc198974af3b3040b710129121930x00ca000000cc8411d52d6045c82c7984033e0000"
            ], 
            "transferMaxCount": 7, 
            "transferOverCount": 6, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 1, 
            "bothOwnedEnsCount": 4, 
            "light": false
        }, 
        {
            "source": "0x8ae1713594c61e2b26fef4b03a7a39fa6f296734", 
            "target": "0x577c2d035a6f8d69485b772558477cfc3b87ec7b", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x577c2d035a6f8d69485b772558477cfc3b87ec7b"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0x577c2d035a6f8d69485b772558477cfc3b87ec7b", 
            "target": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": [
                "ens"
            ], 
            "edgeIds": [
                "ens_0x577c2d035a6f8d69485b772558477cfc3b87ec7b0x00ca000000cc8411d52d6045c82c7984033e0000"
            ], 
            "transferMaxCount": 0, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 1, 
            "light": false
        }, 
        {
            "source": "0xa21b4397775ffc198974af3b3040b71012912193", 
            "target": "0x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0xa21b4397775ffc198974af3b3040b710129121930x629d6688dd4546da8935ee1602be62d92b3c5a7c"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0x98db427092018b71b10a712988b4510669eb0ec9", 
            "target": "0x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0x98db427092018b71b10a712988b4510669eb0ec90x629d6688dd4546da8935ee1602be62d92b3c5a7c"
            ], 
            "transferMaxCount": 2, 
            "transferOverCount": 2, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }, 
        {
            "source": "0x98db427092018b71b10a712988b4510669eb0ec9", 
            "target": "0x00ca000000cc8411d52d6045c82c7984033e0000", 
            "type": [
                "ens", 
                "assertsMovement", 
                "transfer"
            ], 
            "edgeIds": [
                "ens_0x98db427092018b71b10a712988b4510669eb0ec90x00ca000000cc8411d52d6045c82c7984033e0000", 
                "asserts_movement_0x98db427092018b71b10a712988b4510669eb0ec90x00ca000000cc8411d52d6045c82c7984033e0000", 
                "transfer_0x98db427092018b71b10a712988b4510669eb0ec90x00ca000000cc8411d52d6045c82c7984033e0000"
            ], 
            "transferMaxCount": 60, 
            "transferOverCount": 20, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 9, 
            "bothOwnedEnsCount": 6, 
            "light": false
        }, 
        {
            "source": "0xab5801a7d398351b8be11c439e05c5b3259aec9b", 
            "target": "0x629d6688dd4546da8935ee1602be62d92b3c5a7c", 
            "type": [
                "transfer"
            ], 
            "edgeIds": [
                "transfer_0xab5801a7d398351b8be11c439e05c5b3259aec9b0x629d6688dd4546da8935ee1602be62d92b3c5a7c"
            ], 
            "transferMaxCount": 1, 
            "transferOverCount": 0, 
            "gasProviderAmount": 0, 
            "depositCount": 0, 
            "crossChainBridgeCount": 0, 
            "assertsMovementTransfersCount": 0, 
            "bothOwnedEnsCount": 0, 
            "light": false
        }
    ]
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
        },
        'A': {
            'fill': '#af7373',
            'stroke': '#a6244b'
        },
        'B': {
            'fill': '#0c311a',
            'stroke': '#a0f2e7'
        },
        'C': {
            'fill': '#7379af',
            'stroke': '#e8a0f2'
        },
        'D': {
            'fill': '#73af8b',
            'stroke': '#a0e4f2'
        },
        'E': {
            'fill': '#aaaf73',
            'stroke': '#e3f2a0'
        }
    }
    const simulationContent: any = useRef({
        forceSimulation: {},
        simulationSvg: {},
        simulationLinks: {},
        simulationNodes: {},
        simulationPashText: {}
    })

    useEffect(() => {
        if (width && height && nodes.length && links.length) {
            initData()
        }
    }, [width, height, nodes, links])

    const initData = () => {
        initSvg()
        const arrLinks: any[] = setLinkGroup(links)
        restart(arrLinks, nodes)
    }

    const restart = (links: any[], nodes: any[]) => {
        initSimulation(nodes, links)
        drawMarker(links)
        drawSimulationLines(links)
        drawSimulationNodes(nodes)
        simulationContent.current.forceSimulation.alphaDecay(.5).restart()
    }

    const initSimulation = (nodes: any[], links: any[]) => {
        simulationContent.current.forceSimulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).distance(200).id((d: any) => { return d.address }))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("charge", d3.forceManyBody().strength(-400))
            .force("x", d3.forceX(width / 2).strength(0.06))
            .force("y", d3.forceX(height / 2).strength(0.06))
            .force('collide', d3.forceCollide().radius(80))

        simulationContent.current.forceSimulation.on("tick", tickDraw)
    }

    // 初始化svg
    const initSvg = () => {
        simulationContent.current.simulationSvg  = d3.select(`.svg-content`).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr('viewBox', [0, 0, width, height])
        removeSvgNode(simulationContent.current.simulationSvg)
        initLinePathAndNode(simulationContent.current.simulationSvg)
        bindSvgHander(simulationContent.current.simulationSvg)
    }

    // Remove force layout and data
    const removeSvgNode = (svg: any) => {
        svg.select("#buildLineId").remove()
        svg.select("#buildNodeId").remove()
    }

    // handles to link and node element groups
    const initLinePathAndNode = (svg: any) => {
        simulationContent.current.simulationLinks = svg.append('svg:g')
            .attr('id', 'buildLineId')
            .attr("fill", "none")
            .selectAll('path')
        
        simulationContent.current.simulationNodes = svg.append('svg:g')
            .attr('id', 'buildNodeId')
            .attr("stroke-linecap", "round")
            .selectAll('g')
    }

    // 为这个svg绑定缩放事件
    const bindSvgHander = (svgContainer: any) => {
        svgContainer.call(
            d3
                .zoom() // 创建一个新的缩放行为
                .scaleExtent([.1, 5]) // 限制缩放范围
                .on("zoom", (d:any) => {
                    svgContainer.select("#buildLineId") // #buildLineId, #buildNodeId
                        .attr(
                            "transform", // svg下的g标签移动大小
                            `translate(${d.transform.x},${d.transform.y})scale(${d.transform.k})`
                        )
                    svgContainer.select("#buildNodeId") // #buildLineId, #buildNodeId
                        .attr(
                            "transform", // svg下的g标签移动大小
                            `translate(${d.transform.x},${d.transform.y})scale(${d.transform.k})`
                        )    
                })
        ).on('dblclick.zoom', null)
    }

    // 找出是否是双向边
    const setLinkGroup = (arrLinks: any[]) => {
        console.log('arrLinks==', arrLinks)
        let linkGroup: any = {}
        let resLinkList: any[] = updateLinks(arrLinks)
        resLinkList.forEach((item: any, index: number) => {
            if (!linkGroup.hasOwnProperty(item.key)) {
                linkGroup[item.key] = []
            }
            linkGroup[item.key].push(item)
        })

        resLinkList.forEach((link: any) => {
            let key: string = link.key
            if (linkGroup[key].length > 1) {
                link.isDualChannel = true // 双向边
            } else {
                link.isDualChannel = false // 单向边
            }
            if (link.target.address === defaultAddress) {
                link.isFather = true
            }
        })
        return resLinkList
    }

    // 给每个link添加key属性
    const updateLinks = (links: any []): any[] => {
        links.forEach((link: any) => {
            const key = link.source < link.target ? link.source + ':' + link.target : link.target + ':' + link.source
            link.key = key
        })
        return links
    }

    // 指时间间隔，隔一段时间刷新一次画面
    const tickDraw = () => {
        simulationContent.current.simulationLinks.attr('d', linkArc)
            .attr('stroke', (link: any) => {
                if (link.light) {
                    return '#FDDD60'
                } else {
                    return '#979797'
                }
            })
        simulationContent.current.simulationPashText.attr('d', pathTextArc)
        simulationContent.current.simulationNodes.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    }

    // 渲染path
    const linkArc = (d: any) => {
        if (d.isDualChannel) {
            const r = 1000 // Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y)
            return `
                M${d.source.x},${d.source.y}
                A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
            `
        } else {
            const r = 0
            return `
                M${d.source.x},${d.source.y}
                L${d.target.x},${d.target.y}
            `
        }
    }

    // M表示“Move to”(移动到)命令，A表示“Arc”(弧形)命令，L表示“Line”(直线)命令。
    const pathTextArc = (d: any) => {
        if (d.isDualChannel) {
            const r = 1000
            if (d.target.x < d.source.x) { // 判断边是从左到右，还是右到左
                return `
                    M${d.target.x},${d.target.y + 12}
                    A${r},${r} 0 0,0 ${d.source.x},${d.source.y + 12}
                `
            } else {
                return `
                    M${d.source.x},${d.source.y - 6}
                    A${r},${r} 0 0,1 ${d.target.x},${d.target.y - 6}
                `
            }
        } else {
            if (d.target.x < d.source.x) {
                return `
                    M${d.target.x},${d.target.y + 12}
                    L${d.source.x},${d.source.y + 12}
                `
            } else {
                return `
                    M${d.source.x},${d.source.y - 6}
                    L${d.target.x},${d.target.y - 6}
                `
            }
        }
    }

    // 画箭头
    const drawMarker = (links: any) => {
        simulationContent.current.simulationSvg.append('svg:defs').selectAll("marker")
            .data(links)
            .join('marker')
                .attr('id', (link: any) => {
                    return `arrow-marker-${link.source.address}-${link.target.address}`
                })
                .attr('markerUnits', 'strokeWidth')
                .attr('markerWidth', 12)
                .attr('markerHeight', 12)
                .attr('refX', 25)
                .attr('refY', 6)
                .attr('orient', 'auto')
                .attr('viewBox', '0 0 12 12')
            .append("svg:path")
                .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")
                .attr('fill', (link: any) => {
                    if (link.light) {
                        return '#FDDD60'
                    } else {
                        return '#979797'
                    }
                })
    }

    // 画线
    const drawSimulationLines = (links: any) => {
        // 绑定数据,并得到update部分
        const sLink: any = simulationContent.current.simulationLinks.data(links)
        sLink.exit().remove()
        const linkG: any = sLink.enter().append('svg:g')
            .attr('class', (link: any) => {
                return `g-${link.target.address}-${link.source.address}`
            })
            .attr('id', (link: any) => {
                return `g-${link.source.address}-${link.target.address}`
            })
        simulationContent.current.simulationLinks = linkG.append('svg:path')
            .attr('class', 'line-path')
            .attr('id', (link: any) => {
                return `path-${link.source.address}-${link.target.address}`
            })
            .attr('stroke', '#979797')
            .attr('fill', 'transparent')
            .attr('stroke-linecap', 'round')
            .attr("stroke-width", 2)
            .attr('cursor', 'pointer')
            .attr('marker-end', (link: any) => {
                return `url(#arrow-marker-${link.source.address}-${link.target.address})`
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
            .merge(simulationContent.current.simulationLinks)

        simulationContent.current.simulationPashText = linkG.append('svg:path')
            .attr('class', 'line-path')
            .attr('id', (link: any) => {
                return `pathText-${link.source.address}-${link.target.address}`
            })
            .attr('stroke', 'transparent')
            .attr('fill', 'transparent')
            .attr('stroke-linecap', 'round')
            .attr("stroke-width", 2)
            .attr('cursor', 'pointer')
            .merge(simulationContent.current.simulationLinks)    

        drawPathText(linkG)     
    }

    // 画节点
    const drawSimulationNodes = (nodes: any) => {
        let timer: any
        const sNode :any = simulationContent.current.simulationNodes.data(nodes)
        sNode.exit().remove()
        const g = sNode.enter().append('svg:g')
            .attr('class', 'nodeId')
            .attr('id', (node: any) => {
                return `id${node.address}`
            })
            .call(
                d3
                    .drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            )
        
        g.append('svg:circle')
            .attr('class', 'nodeCircle')
            .attr('id', (node: any) => {
                return 'circle' + node.address
            })
            .attr('cursor', 'pointer')
            .attr('fill', (node: any) => {
                return colors[node.type].fill
            })
            .attr("stroke-width", (node: any) => {
                if (node.type === 'high-risk') {
                    return 12
                } else if (node.address === defaultAddress) {
                    return 10
                } else {
                    return 5
                }
            })
            .attr('stroke', (node: any) => {
                return colors[node.type].stroke
            })
            .attr("r", (node: any) => {
                if (node.type === 'high-risk') {
                    return 16
                } else if (node.address === defaultAddress) {
                    return 13
                } else {
                    return 9
                }
            })
            .on('click', (event: any, node: any) => {
                event.stopPropagation()
                timer && clearTimeout(timer)
                timer = setTimeout(() => {
                    nodeClick(node)
                },300)
            })
            .on('dblclick', (event: any, node: any) => {
                event.stopPropagation()
                timer && clearTimeout(timer)
                nodeDbClick(node)
            })
            .on('mouseover', (event: any, node: any) => {
                event.stopPropagation()
            })
            .on('mouseleave', (event: any, node: any) => {
                event.stopPropagation()
            })
            
        g.append('svg:text')
            .attr('x', '0')
            .attr('y', '27')
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .style('font-size', '9rem')
            .text((node: any) => {
                if (node.tag) {
                    return node.tag
                } else if (node.type) {
                    return node.type
                } else {
                    return ''
                }
            })
            .attr('cursor', 'pointer')  
        simulationContent.current.simulationNodes = g.merge(sNode)
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
        d3.select(`#id${address}`).attr('display', 'none')
        d3.selectAll('[id*=g-' + address + ']').attr('display', 'none')
        d3.selectAll('[class*=g-' + address + ']').attr('display', 'none')
    }

    // 双击节点点击事件
    const nodeDbClick = (node: any) => {
        const address: string = node.address || ''
        const addNodes: any[] = [
            {
                "address": "A", 
                "type": "A", 
                "tag": "serialtrade.eth", 
                "light": true
            },
            {
                "address": "B", 
                "type": "B", 
                "tag": "serialtrade.eth", 
                "light": false
            },
            {
                "address": "C", 
                "type": "C", 
                "tag": "serialtrade.eth", 
                "light": false
            },
            {
                "address": "D", 
                "type": "D", 
                "tag": "serialtrade.eth", 
                "light": false
            },
            {
                "address": "E", 
                "type": "E", 
                "tag": "serialtrade.eth", 
                "light": false
            }
        ]
        const addLinks: any[] = [
            {
                "source": address, 
                "target": "A", 
                "type": [
                    "ens", 
                    "transfer"
                ], 
                "edgeIds": [
                    "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                    "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
                ], 
                "transferMaxCount": 1, 
                "transferOverCount": 0, 
                "gasProviderAmount": 0, 
                "depositCount": 0, 
                "crossChainBridgeCount": 0, 
                "assertsMovementTransfersCount": 0, 
                "bothOwnedEnsCount": 1, 
                "light": true
            }, 
            {
                "source": address, 
                "target": "B", 
                "type": [
                    "ens", 
                    "transfer"
                ], 
                "edgeIds": [
                    "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                    "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
                ], 
                "transferMaxCount": 1, 
                "transferOverCount": 0, 
                "gasProviderAmount": 0, 
                "depositCount": 0, 
                "crossChainBridgeCount": 0, 
                "assertsMovementTransfersCount": 0, 
                "bothOwnedEnsCount": 1, 
                "light": false
            },
            {
                "source": address, 
                "target": "C", 
                "type": [
                    "ens", 
                    "transfer"
                ], 
                "edgeIds": [
                    "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                    "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
                ], 
                "transferMaxCount": 1, 
                "transferOverCount": 0, 
                "gasProviderAmount": 0, 
                "depositCount": 0, 
                "crossChainBridgeCount": 0, 
                "assertsMovementTransfersCount": 0, 
                "bothOwnedEnsCount": 1, 
                "light": false
            },
            {
                "source": address, 
                "target": "D", 
                "type": [
                    "ens", 
                    "transfer"
                ], 
                "edgeIds": [
                    "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                    "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
                ], 
                "transferMaxCount": 1, 
                "transferOverCount": 0, 
                "gasProviderAmount": 0, 
                "depositCount": 0, 
                "crossChainBridgeCount": 0, 
                "assertsMovementTransfersCount": 0, 
                "bothOwnedEnsCount": 1, 
                "light": false
            },
            {
                "source": address, 
                "target": "E", 
                "type": [
                    "ens", 
                    "transfer"
                ], 
                "edgeIds": [
                    "ens_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc", 
                    "transfer_0x8ae1713594c61e2b26fef4b03a7a39fa6f2967340x0000000000488b7147b38452e686b41c4fa8bedc"
                ], 
                "transferMaxCount": 1, 
                "transferOverCount": 0, 
                "gasProviderAmount": 0, 
                "depositCount": 0, 
                "crossChainBridgeCount": 0, 
                "assertsMovementTransfersCount": 0, 
                "bothOwnedEnsCount": 1, 
                "light": false
            }
        ]
        const arrLinks: any[] = setLinkGroup(addLinks)
        removeSvgNode(simulationContent.current.simulationSvg)
        initLinePathAndNode(simulationContent.current.simulationSvg)
        bindSvgHander(simulationContent.current.simulationSvg)
        restart([...links, ...arrLinks], [...nodes, ...addNodes])
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
        // d.fx = null
        // d.fy = null
    }

    return (
        <MainContent className='svg-content'>

        </MainContent>
    )
}

export default ComD3Force