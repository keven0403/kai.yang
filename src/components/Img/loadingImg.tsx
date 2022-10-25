import { useEffect, useState } from 'react'
import styled from 'styled-components'
import DefaultImg from '@/assets/images/defaultImg.png'

const LoadingImgContent = styled.div`
    .CollectionImg {
        width: 100%;
        height: 100%;
    }
    .spinner {
        width: 100%;
        height: 100%;
        margin: auto;
        background-color: #333;
        -webkit-animation: scaleout 1.0s infinite ease-in-out;
        animation: scaleout 1.0s infinite ease-in-out;
    }
        
    @-webkit-keyframes scaleout {
        0% { -webkit-transform: scale(0.0) }
        100% {
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }
        
    @keyframes scaleout {
        0% { 
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 100% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
            opacity: 0;
        }
    }
`

const ComLoadingImg = (props: any) => {
    const src:string = props.src
    const [imgUrl, setImgUrl] = useState('')
    const width: string = props.width + 'rem'
    const height: string = props.width + 'rem'
    const borderRadius: string = props.borderRadius + '%'

    useEffect(() => {
        if (src) {
            updateImg(src)
        }
    }, [src])

    const updateImg = (src: string) => {
        const image = new Image()
        image.src = src
        image.onload = (res: any) => {
            setImgUrl(src)
        }

        image.onerror = (res: any) => {
            setImgUrl(DefaultImg)
        }
    }

    return (
        <LoadingImgContent style={{width, height, borderRadius}}>
            {
                imgUrl ?
                    <img 
                        className='CollectionImg'
                        style={{borderRadius}} 
                        src={imgUrl}
                        alt="" 
                    />
                :
                    <div className="spinner" style={{borderRadius}}></div>
            }
        </LoadingImgContent>
    )
}

export default ComLoadingImg