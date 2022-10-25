import styled from 'styled-components'
import { Progress } from 'antd'

const ProgressContent = styled.div`
    width: 100%;
    .ant-progress-line {
        font-size: 9rem;
    }
    .ant-progress-inner {
        background-color: #3E434E !important;
    }
    .ant-progress-text {
        color: var(--conten-info-name-color)
    }
`

interface ProgressInfo {
    percent: number,
    strokeColor: string,
    showInfo: boolean
    data: string,
}

const ComProgress = ({
    percent,
    strokeColor,
    showInfo,
    data
}: ProgressInfo) => {
    return (
        <ProgressContent>
            <Progress 
                percent={percent}
                showInfo={showInfo}
                strokeColor={strokeColor}
                format={() => data}
                status='active'
            />
        </ProgressContent>
    )
}
export default ComProgress