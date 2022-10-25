
import styled from "styled-components"
import { Modal } from "antd"
import { useImperativeHandle, useState, forwardRef } from "react"
import entityFailImg from '@/assets/images/entityFail.png'

const ModalContent = styled.div`
    padding: 40rem 0;
    box-sizing: border-box;
    .failBox {
        display: flex;
        justify-content: center;
        align-items: center;
        .failImg {
            width: 150rem;
        }
    }
    .message {
        text-align: center;
        font-size: 20rem;
        font-family: Courier;
        color: var(--content-info-active-color);
    }
    .content {
        margin-top: 10rem;
        text-align: center;
        padding: 0rem;
        box-sizing: border-box;
        font-size: 14rem;
        font-family: Courier;
        color: var(--content-info-active-color);
    }
`
const FailModal = (props:any, ref: any) => {
    const [visible, setVisible] = useState(props.visible || false)
    const [type, setType] = useState(props.type)
    const [content, setContent] = useState(props.content)
    const [message, setMessage] = useState(props.content)
    const [title, setTitle] = useState('')

    useImperativeHandle(ref, () => ({
        // onChild 就是暴露给父组件的方法
        updateData ({
            type = '',
            visible = false,
            title = '',
            message = '',
            content = ''
        }) {
            setType(type)
            setTitle(title)
            setVisible(visible)
            setMessage(message)
            setContent(content)
        }
    }))

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={null}
        >
            <ModalContent>
                <div className="failBox">
                    <img className="failImg" src={entityFailImg} alt="" />
                </div>
                <div className="message">{message}</div>
                <div className="content">{content}</div>
            </ModalContent>
        </Modal>
    )
}
export default forwardRef(FailModal)