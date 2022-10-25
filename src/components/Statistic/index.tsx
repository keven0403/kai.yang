import { Statistic, Tooltip } from 'antd'
import styled from 'styled-components'
import { StatisticInfo } from '@/constants/types'

const ComStatisticBox = styled.div`
    .ant-statistic {
        .ant-statistic-content {
            .ant-statistic-content-prefix {
                font-family: HelveticaNeue;
            }
            .ant-statistic-content-suffix {
                font-family: HelveticaNeue;
            }
            .ant-statistic-content-value {
                .ant-statistic-content-value-decimal,
                .ant-statistic-content-value-int {
                    font-family: HelveticaNeue;
                }
            }
        } 
    }
`

const ComStatistic = ({
    value,
    suffix,
    prefix,
    color,
    fontSize,
    precision
}: StatisticInfo) => {
    return (
        <ComStatisticBox>
            <Statistic 
                value={value || 0}
                precision={precision}
                valueStyle={{ color, fontSize: `${fontSize}rem` }}
                prefix={prefix}
                suffix={suffix}
            />
        </ComStatisticBox>
    )
}
export default ComStatistic