import styled from 'styled-components'
import { Progress } from 'antd'

const ProgressContent = styled.div`
    .ant-progress-line {
        width: 100rem;
    }
    .ant-progress-inner {
        width: 110rem !important;
        height: 110rem !important;
        background-color: #3E434E !important;
    }
    .ant-progress-circle .ant-progress-text {
        color: var(--whiteColor);
        font-size: 22rem;
        font-family: HelveticaNeue;
    }
    .ant-progress-circle-trail {
        stroke: var(--chartBorderColor)
    }
`

interface ProgressInfo {
    percent: number,
    strokeColor: string
}

const ComCircleProgress = ({
    percent,
    strokeColor
}: ProgressInfo) => {
    return (
        <ProgressContent>
            <Progress 
                type="circle"
                percent={percent}
                strokeColor={strokeColor}
            />
        </ProgressContent>
    )
}
export default ComCircleProgress