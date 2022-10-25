import ReactEcharts from 'echarts-for-react'
import { EchartsInfo } from '@/constants/types'

const ComEcharts = ({
    options,
    showLoading
}: EchartsInfo) => {

    return (
        <ReactEcharts
            style={{height: '100%', width: '100%'}}
            option={options}
            notMerge={true}
            lazyUpdate={true}
            showLoading={showLoading}
            loadingOption={{
                text: 'loading...',
                maskColor: '#2E313892',
                color: '#3AC89F',
                textColor: '#fff',
            }}
        />
    )
}
export default ComEcharts