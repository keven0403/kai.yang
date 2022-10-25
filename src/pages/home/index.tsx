import styled from 'styled-components'
import PriceRelationChart from '@/components/Echarts/pricing'
import ComLoadingImg from '@/components/Img/loadingImg'
import Logo from '@/assets/images/logo.png'

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
        </MainContent>
    )
}

export default Home
