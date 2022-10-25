import styled from 'styled-components'
import { useAppDispatch } from '@/state/hooks'
import { setGlobleLoadingState } from '@/state/loading/actions'
import { useEffect } from 'react'

const MainContent = styled.div``

const Pricing = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setGlobleLoadingState({ isLoading: true }))
    }, [])

    return (
        <MainContent>
            pricing-content
        </MainContent>
    )
}

export default Pricing
