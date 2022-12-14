import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import LocaleModal from '@/components/Modal/LocaleModal'
import { useRef } from 'react'

const SwitchLocaleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    gap: 10rem;
    padding: 0 10rem;
    font-size: 20rem;
`

const SwitchLocale = () => {
    const localModalRef:any = useRef()

    const switchLocalClick = async () => {
        localModalRef.current.updateData({visible: true})
    }

    return (
        <div>
            <SwitchLocaleBox onClick={switchLocalClick}>
                <div>
                    <FormattedMessage 
                        id="header.countries"
                        defaultMessage="国家"
                    />
                </div>
                
                <div>
                    <FormattedMessage 
                        id="header.language"
                        defaultMessage="语言"
                    />
                </div>
            </SwitchLocaleBox>

            <LocaleModal onRef={localModalRef} />
        </div>

    )
}
export default SwitchLocale
