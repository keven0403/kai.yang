import styled from 'styled-components'
import PriceRelationChart from '@/components/Echarts/pricing'
import ComLoadingImg from '@/components/Img/loadingImg'
import Logo from '@/assets/images/logo.png'
import ComProgress from '@/components/Progress'
import ComSkeleton from '@/components/Skeleton'
import ComStatistic from '@/components/Statistic'
import CountUp from 'react-countup'
import { FormattedMessage } from 'react-intl'

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50rem;
`

const RowContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50rem;
    width: 1200rem;
    .countUpCls {
        color: red;
        font-size: 32rem;
    }
`

const Home = () => {
    return (
        <MainContent>
            <RowContent>
                <FormattedMessage id='percent.exchanges' defaultMessage="" />
            </RowContent>

            <RowContent>
                <PriceRelationChart />
            </RowContent>

            <RowContent>
                <ComLoadingImg
                    width={50}
                    height={50}
                    borderRadius={50}
                    src={''}
                />

                <ComLoadingImg
                    width={50}
                    height={50}
                    borderRadius={50}
                    src={Logo}
                />

                <ComLoadingImg
                    width={50}
                    height={50}
                    borderRadius={50}
                    src='rwerwe'
                />
            </RowContent>  

            <ComProgress 
                percent={30}
                data={'test 30'}
                strokeColor='#23B899'
                showInfo={true}
            />

            <ComSkeleton loading={true} width={600} />

            <RowContent>
                <ComStatistic 
                    value={32432}
                    suffix=''
                    prefix='$'
                    color='#fff'
                    fontSize={12}
                    precision={2}
                />

                <ComStatistic 
                    value={34}
                    suffix='%'
                    prefix=''
                    color='#fff'
                    fontSize={12}
                    precision={2}
                />
            </RowContent>

            <RowContent>
                <CountUp
                    className='countUpCls'
                    decimal='.'
                    decimals={3}
                    duration={2}
                    delay={0}
                    start={30}
                    end={100}
                    prefix='$'
                    suffix='%'
                    redraw={true}
                />
            </RowContent>
            
        </MainContent>
    )
}

export default Home
