import styled from "styled-components"
import WalletConnectIcon from '@/assets/images/walletconnect.svg'

const MainContent = styled.div`
    display: flex;
    align-items: center;
    gap: 10rem;
    flex: 1;
    font-size: 16rem;
    font-family: HelveticaNeue;
    color: var(--whiteColor);
    font-weight: bold;
    background: #0059ff;
    height: 56rem;
    padding: 0 10rem;
    border-radius: 6rem;
    cursor: pointer;
    &:hover {
        opacity: .7;
    }
    img {
        height: 25rem;
    }
`

const WalletConnect = (props: any) => {
    const walletConnectClick = () => {
        props.walletConnectClick()
    }

    return (
        <MainContent onClick={ walletConnectClick }>
            <img src={WalletConnectIcon} alt='' />
            Wallet Connect
        </MainContent>
    )
}

export default WalletConnect