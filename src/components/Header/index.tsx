import styled from 'styled-components'
import LogoImg from '@/assets/images/logo.png'
import SwitchTheme from '@/components/SwitchTheme'

const HeaderMainContent = styled.div`
    background-color: var(--header-bg);
    height: 60rem;
    position: fixed;
    width: 100%;
    z-index: 9;
`

const HeaderLedtContent = styled.div`
    padding-left: 60rem;
    .logo {
        height: 40rem;
    }
`

const HeaderCenterContent = styled.div`
    flex: 1;
`

const HeaderRightContent = styled.div`
    gap: 50rem;
    padding-right: 30rem;
`

const HeaderListMenu = styled.div`
    gap: 50rem;
    .item {
        font-size: 16rem;
        font-family: HelveticaNeue;
        color: var(--child-03-color);
        cursor: pointer;
        &:hover {
            opacity: .7;
        }
    }
`

const HeaderLoginBut = styled.div`
    width: 210rem;
    height: 40rem;
    background: linear-gradient(180deg, #6CE6CD 0%, var(--header-login-but-bg) 100%);
    border-radius: 4rem;
    cursor: pointer;
    color: var(--child-05-color);
    &:hover {
        opacity: .7;
    }
`

const ComHeader = () => {
    return (
        <HeaderMainContent className="flex-center">
            <HeaderLedtContent>
                <img className='logo' alt='logo' src={LogoImg} /> 
            </HeaderLedtContent>

            <HeaderCenterContent></HeaderCenterContent>

            <HeaderRightContent className='flex-center'>
                <HeaderListMenu className='flex-center'>
                    <div className='item'>Report Terminal</div>

                    <div className='item'>Address Filter</div>

                    <SwitchTheme />
                </HeaderListMenu>

                <HeaderLoginBut className='flex-center-content'>Login Via Web3 Wallet</HeaderLoginBut>
            </HeaderRightContent>
        </HeaderMainContent>
    )
}

export default ComHeader