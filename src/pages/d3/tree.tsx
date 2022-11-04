import styled from 'styled-components'
import ComD3Tree from '@/components/D3/tree'
import ComToolBox from '@/components/Tool/toolBox'
import { useEffect, useRef, useState } from 'react'

const MainContent = styled.div`
    position: relative;
    height: 100vh;
    background: #000;
    width: 100%;
`

const PageTree = () => {
    const toolBoxRef: any = useRef(null)
    const mainContentRef: any = useRef(null)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (mainContentRef !== null) {
            const currentEle: any  = mainContentRef.current
            const width = currentEle.clientWidth - 40 // 画布宽度
            const height = currentEle.clientHeight - 40 // 画布高度
            setWidth(width)
            setHeight(height)
        }
    }, [mainContentRef])

    // 单个节点隐藏
    const hideHander = () => {
        console.log('单个节点隐藏')
    }

    // 隐藏或展开节点下面的子节点
    const hideChildNodeHander = () => {
        console.log('隐藏或展开节点下面的子节点')
    }

    // 刷新所有节点
    const refreshHander = () => {
        console.log('刷新所有节点')
    }
    
    return (
        <MainContent ref={mainContentRef}>
            <ComD3Tree
                width={width}
                height={height}
            />

            <ComToolBox 
                onRef={ toolBoxRef }
                hideChildNodeHander={ hideChildNodeHander }
                hideHander={ hideHander }
                refreshHander={ refreshHander }
            />
        </MainContent>
    )
}

export default PageTree
