import styled from 'styled-components'
import PriceRelationChart from '@/components/Echarts/pricing'
import ComLoadingImg from '@/components/Img/loadingImg'
import Logo from '@/assets/images/logo.png'
import ComProgress from '@/components/Progress'
import ComSkeleton from '@/components/Skeleton'
import ComStatistic from '@/components/Statistic'

const MainContent = styled.div``

const Home = () => {
    return (
        <MainContent>
            home-content
            <PriceRelationChart />

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

            <ComProgress 
                percent={30}
                data={'test 30'}
                strokeColor='#23B899'
                showInfo={true}
            />

            <ComSkeleton loading={true} width={100} />

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
        </MainContent>
    )
}

export default Home
