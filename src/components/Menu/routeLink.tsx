import { Link } from 'react-router-dom'
import Icon from '@ant-design/icons'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

const LinkClass = styled.div`
    display: flex;
    align-items: center;
    .navLabel {
        color: var(--whiteColor);
        font-size: 16rem;
        font-family: Courier;
        font-weight: 500;
    }
    .activeKey {
        color: var(--fourthColor); 
    }
    .active {
        color: var(--fourthColor);
    }
`

const RouteLink = (props:any) => {
    return (
        <Link to={props.to}>
            <LinkClass>
                {/* {
                    props.isShowIcon
                    ?
                        <Icon component={
                                defaultSelectedKeys === props.defaultKey ? props.activeIcon : props.normalIcon
                            }
                        /> 
                    :
                        ''
                } */}
                
                {props.title}
            </LinkClass>
        </Link>
    )
}

export default RouteLink