import styled from 'styled-components'
import ComD3Force from '@/components/D3/force'

const MainContent = styled.div`
    height: 100vh;
    background: #000;
`

const Profile = () => {
    return (
        <MainContent>
            <ComD3Force />
        </MainContent>
    )
}

export default Profile
