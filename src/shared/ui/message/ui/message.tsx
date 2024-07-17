'use client'
import React, {useState} from 'react';
import {IMessage} from "@/shared/types";
import {formatMessage} from "@/shared/ui/message/lib/formatMessage";
import {handleMentionClick} from "@/shared/ui/message/lib/messageAction";
import './message.scss'
import {USER_LIST} from "@/shared/consts";
import {formatTime} from "@/shared/lib/formatDate";
import {Avatar, Button, Modal} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
    UserOutlined
} from "@ant-design/icons";
import {motion} from "framer-motion";
import {ReadenMessageIcon, SentMessageIcon} from "@/shared/assets/icons";
import useStore from "@/hooks/useStore";

interface props {
    message: IMessage;
    isFirst: boolean;
    chatId: string;
}

const Message = ({message, isFirst, chatId}: props) => {
    const [fullScreenImage, setFullScreenImage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {removeMessage, selectEditMessage} = useStore()
    const handleOk = () => {
        removeMessage(chatId, message.id);
        setIsModalOpen(false);
    };
    const SELF_ID = 'ME';
    const user = USER_LIST.find((u) => u.id === message.user)
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.75}}
            animate={{opacity: 1, scale: 1}}
            transition={{
                duration: 0.4,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            key={`msg-${message.id}`}
            className={`message-block ${message.user === SELF_ID ? 'self-message-position' : 'other-message-position'}`}
        >
            {message.user !== SELF_ID && isFirst &&
                <Avatar
                    size={32}
                    src={user?.avatar || ''}
                    icon={<UserOutlined/>}
                    alt={user?.nickname[0] || "X"}
                    className={'message-block__avatar'}
                />
            }
            <div
                className={`message-block__text-field ${message.user === SELF_ID ? 'self-message' : 'other-message'} ${isFirst ? 'other-message-arrow self-message-arrow' : ''}`}
            >

                {message?.user !== SELF_ID && isFirst &&
                    <div className={'message-block__user-info-block'}>
                        <p className={'message-block__nickname'}>
                            {user?.nickname || 'Not Found User'}
                        </p>
                        <p className={'message-block__vacancy'}>
                            {user?.vacancy || ''}
                        </p>
                    </div>
                }
                <div className="message-block__message-box">
                    <div className="message-block__content">
                        {/*Костыли изза локального хранилища*/}
                        {message.files?.length > 0 && (message.files[0] instanceof Blob || message.files[0] instanceof File) &&
                            <>
                                <img
                                    //@ts-ignore
                                    src={URL.createObjectURL(message.files[0])}
                                    alt={''}
                                    className={'message-block__image'}
                                    onClick={() => {
                                        setFullScreenImage(prevState => !prevState)
                                    }}
                                />
                                <Modal open={fullScreenImage} footer={null} onCancel={() => {
                                    setFullScreenImage(false)
                                }}>
                                    <img src={URL.createObjectURL(message.files[0])} alt="Full size"
                                         style={{width: '100%', height: 'auto'}}/>
                                </Modal>
                            </>
                        }
                        <p className={'message-block__message'}>
                            {formatMessage(message.message, handleMentionClick)}
                        </p>
                    </div>
                    <div className={'message-block__send-time'}>
                        <p>
                            {message.modified &&
                                <>
                                    <span className={'message-block__modified'}>
                                        edited
                                    </span>
                                    <br/>
                                </>
                            }
                            {formatTime(message.sent)}
                        </p>
                        {message.user === SELF_ID &&
                            <>
                                {message.status === 'loading' ?
                                    <LoadingOutlined className={'message-block__status'}/> :
                                    message.status === 'sent' ?
                                        <SentMessageIcon className={'message-block__status'}/> :
                                        message.status === 'read' ?
                                            <ReadenMessageIcon
                                                className={'message-block__status message-block__status__readen'}/> :
                                            message.status === 'error' ?
                                                <ExclamationCircleOutlined
                                                    className={'message-block__status message-block__status__dangerous'}/> :
                                                <LoadingOutlined className={'message-block__status'}/>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            {message.user === SELF_ID &&
                <div className={'chain-actions'}>
                    <Button
                        type={'text'}
                        className={'button-ghost chain-actions__button'}
                        onClick={()=>{
                            selectEditMessage(chatId, message.id)
                        }}
                    >
                        <EditOutlined/>
                    </Button>
                    <Button
                        type={'text'}
                        onClick={() => {
                            setIsModalOpen(prevState => !prevState)
                        }}
                        className={'button-ghost chain-actions__button chain-actions__button__dangerous'}
                    >
                        <DeleteOutlined/>
                    </Button>
                    <Modal
                        title="Delete message?"
                        open={isModalOpen}
                        onOk={handleOk}
                        okText={'Delete'}
                        okType={'danger'}
                        onCancel={() => {
                            setIsModalOpen(false)
                        }}
                    >
                        <p>
                            This action will delete this message. It will be impossible to restore it.
                        </p>
                    </Modal>
                </div>
            }
        </motion.div>
    );
};

export {Message};