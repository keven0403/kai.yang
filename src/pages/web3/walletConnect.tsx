import styled from 'styled-components'
import ComWalletConnect from '@/components/Connect/walletConnect'
import { UserRejectedRequestError } from '@web3-react/walletconnect-connector'
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core"
import { walletconnect } from '@/constants/connectors'

const MainConnect = styled.div``

const PageWalletConnect = () => {
    // active：一个钱包现在是否正在连接状态？
    // account：已连接的区块链账户地址。
    // library：它是web3或ethers，取决于你传入的内容。
    // connector：当前的连接器。因此，当我们连接时，本例中是injected连接器。
    // activate：连接到一个钱包的方法。
    // deactivate: 从一个钱包断开连接的方法
    const { connector, activate, active, account, error } = useWeb3React()
    const isUserRejectedRequestError = error instanceof UserRejectedRequestError
    console.log({
        connector,
        isUserRejectedRequestError
    })

    const walletConnectClick = async () => {
        activate(walletconnect).catch((error) => {
            if (error instanceof UnsupportedChainIdError) {
                activate(walletconnect)
            } else {
                console.log('Pending Error Occured')
            }
        })
    }

    return (
        <MainConnect>
            <ComWalletConnect 
                walletConnectClick={walletConnectClick}
            />
        </MainConnect>
    )
}

export default PageWalletConnect