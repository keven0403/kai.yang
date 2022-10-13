import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/state/hooks'
import { selectThemHandler } from '@/state/them/actions'
import ComIconFont from '@/components/IconFont'

const SwitchThemeBox = styled.div`
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 3rem;
    border-radius: 5rem;
    border: 1rem solid var(--child-03-color);
    cursor: pointer;
    &:hover {
        opacity: .7;
    }
    .icon {
        color: var(--child-03-color);
        width: 16rem;
        height: 16rem;
    }
`

const SwitchTheme = () => {
    const dispatch = useAppDispatch()
    const [themeType, setThemeType] = useState("sun")

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        let localThemeType: string = 'sun'
        setThemeTypeClick(localThemeType)
    }

    const toggleTheme = (scopeName = "sun") => {
        let styleLink: any = document.getElementById("themeId")
        if (styleLink) {
            // 假如存在id为theme-link-tag 的link标签，直接修改其href
            styleLink.href = `/theme/${scopeName}.css?version=<?php echo date('YmdHi');?`
        } else {
            // 不存在的话，则新建一个
            styleLink = document.createElement("link")
            styleLink.type = "text/css"
            styleLink.rel = "stylesheet"
            styleLink.id = "themeId"
            styleLink.href = `/theme/${scopeName}.css?version=<?php echo date('YmdHi');?`
            document.head.append(styleLink);
        }
    }

    const setThemeTypeClick = (parType: string) => {
        let type: string = ''
        if (parType) {
            type = parType
        } else {
            type =  themeType === 'sun' ? 'dark' : 'sun'
        }
        toggleTheme(type)
        localStorage.setItem('themeType', type)
        setThemeType(type)
        dispatch(selectThemHandler({ themType: type }))
    }

    return (
        <SwitchThemeBox onClick={() => setThemeTypeClick('')}>
            {
                themeType === 'sun' ?
                    <ComIconFont className='icon' type='icon-Daytimemode' />
                :
                    <ComIconFont className='icon' type='icon-cc-month' />
            }
        </SwitchThemeBox>
    )
}
export default SwitchTheme