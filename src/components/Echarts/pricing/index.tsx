import { useState } from 'react'
import styled from 'styled-components'
import ComEcharts from '../index'
import { getPriceRelationOptions } from '../options'

const PriceRelationChartContent = styled.div`
    height: 320rem;
    width: 100%;
    margin-top: 30rem;
`

const ChartContent = styled.div`
    background: var(--thirdColor);
    box-shadow: inset 2rem 4rem 8rem 0rem var(--allTimeActivityBoxShadow), inset -1rem -1rem 4rem 0rem var(--allTimeActivityBoxShadowInset);
    border-radius: 5rem;
    border: 1rem solid var(--allTimeActivityBoxBorder);
    height: 100%;
`

const PriceRelationChart = () => {
    const [showLoading, setShowLoading] = useState(false)
    const [dateList, setDateList] = useState<any[]>([
        '2022-10-11','2022-10-12','2022-10-13','2022-10-14','2022-10-15','2022-10-16','2022-10-17'
    ])
    const [holderList, setHolderList] = useState<any[]>([
        10,15,17,12,8,22,20
    ])

    const [priceList, setPriceList] = useState<any[]>([
        8,13,15,19,27,33,39
    ])
    
    return (
        <PriceRelationChartContent>
            <ChartContent>
                <ComEcharts
                    options={getPriceRelationOptions(dateList, holderList, priceList)}
                    showLoading={showLoading}
                />
            </ChartContent>
        </PriceRelationChartContent>
    )
}

export default PriceRelationChart