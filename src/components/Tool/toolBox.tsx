import styled from 'styled-components'
import { useState, useImperativeHandle } from 'react'
import { Tooltip } from 'antd'

const ToolBoxContent = styled.div`
    position: absolute;
    left: 20rem;
    top: 50%;
    transform: translate(-50%, -50%);/*50%为自身尺寸的一半*/
    background: var(--tableHeaderBorderBottomColor);
    border: 1rem solid var(--toolIconFill);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .active {
        cursor: pointer;
    }
    .hidden {
        .icon {
            width: 40rem;
            height: 40rem;
        }
    }
    .show {
        padding: 10rem 0;
        .icon {
            width: 22rem;
            height: 22rem;
        }
    }
    .ref {
        padding: 5rem 0;
        .icon {
            width: 32rem;
            height: 32rem;
        }
    }
`

const HidderBorder = styled.div`
    width: 34rem;
    height: 1rem;
    background:var(--toolIconFill);
`

const ToolBoxItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 50rem;
    .icon {
        fill: var(--toolIconFill);
    }
    
    .active {
        cursor: pointer;
        fill: #fff;
    }

    .name {
        color: var(--secondaryColor);
        font-size: 12rem;
        font-family: HelveticaNeue;
        text-align: center;
    }
    img {
        width: 22rem;
    }
`

const ComToolBox = (props: any) => {
    const [hiddenChild, setHiddenChild] = useState(false)
    const [hiddenNode, setHiddenNode] = useState(false)
    const [showChildList, setShowChildList] = useState(false)

    useImperativeHandle(props.onRef, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            currentNode = {},
        }) {
            
        },

        updateDataToolState ({
            currentNode = {},
            baseData = {
                links: [],
                nodes: [],
                tags: []
            }
        }) {
            const node: any = currentNode
            const dataBase: any = baseData
            const tags: string[] = baseData.tags
            const address: string = node.address
            const group: number = node.group
            if (!Object.keys(node).length) {
                setHiddenChild(false)
                setShowChildList(false)
                setHiddenNode(false)
            } else if (node.isFather) {
                setHiddenNode(true)
                if (node.collapse) { // 已经折叠了子节点，显示展开所有子节点按钮
                    setHiddenChild(false)
                    setShowChildList(true)
                } else { // 没有折叠子节点，展示折叠所有子节点按钮
                    let currentNodeChildNodeList: any[] = [] // 判断改父节点有子节点没,存取该节点下的所有子节点
                    dataBase.links.forEach((link: any) => {
                        // 找出
                        if (address === link.source.address && group === link.source.group && !link.target.isFather) {
                            currentNodeChildNodeList.push(link)
                        }
                    })
                    if (currentNodeChildNodeList.length) {
                        const type: string = currentNodeChildNodeList[0].type
                        if (currentNodeChildNodeList.length === 1 && currentNodeChildNodeList[0].hidden || !tags.includes(type)) {
                            setHiddenChild(false)
                            // setHiddenNode(false)
                            setShowChildList(false)
                        } else {
                            setHiddenChild(true) // 显示隐藏所有节点按钮
                            // setHiddenNode(false)
                            setShowChildList(true)
                        }
                    } else {
                        setHiddenChild(false)
                        // setHiddenNode(false)
                        setShowChildList(false)
                    }
                }
            } else if (!node.isFather) {
                setHiddenChild(false)
                setShowChildList(false)
                setHiddenNode(true)
            }
        }
    }))

    // 单个节点隐藏
    const hideHander = () => {
        setHiddenNode(!hiddenNode)
        props.hideHander()
    }

    // 隐藏或展开节点下面的子节点
    const hideChildNodeHander = (event:any) => {
        event.stopPropagation()
        setHiddenChild(!hiddenChild)
        props.hideChildNodeHander()
    }

    // 刷新所有节点
    const refreshHander = () => {
        props.refreshHander()
    }

    return (
        <ToolBoxContent>
            <ToolBoxItem 
                className={`hidden ${hiddenNode ? 'active' : ''}`}
                onClick={hideHander}>
                    {
                        <Tooltip title='Delete node'>
                            <svg className={`icon ${hiddenNode  ? 'active' : ''}`} aria-hidden="true">
                                <use xlinkHref="#icon-passwordhidden"></use>
                            </svg>
                        </Tooltip>
                    }
            </ToolBoxItem>

            <HidderBorder />

            <ToolBoxItem 
                className={`show ${hiddenChild ? 'active' : ''}`}
                onClick={hideChildNodeHander}>
                    {
                        hiddenChild ?
                            <Tooltip title='Show all child nodes'>
                                <svg className={`icon ${hiddenChild  ? 'active' : ''}`} aria-hidden="true">
                                    <use xlinkHref="#icon-expand-full"></use>
                                </svg>
                                
                            </Tooltip>
                        :
                            <Tooltip title='Hide all child nodes'>
                                <svg className='icon' aria-hidden="true">
                                    <use xlinkHref="#icon-quanjusuoxiao"></use>
                                </svg>
                            </Tooltip>
                    }
            </ToolBoxItem>

            <HidderBorder />

            <ToolBoxItem className='active ref' onClick={refreshHander}>
                <Tooltip title='Refresh'>
                    <svg className="icon active" aria-hidden="true">
                        <use xlinkHref="#icon-refresh"></use>
                    </svg>
                </Tooltip>
            </ToolBoxItem>
        </ToolBoxContent>
    )
}

export default ComToolBox