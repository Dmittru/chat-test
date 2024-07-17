'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Input, Upload} from "antd";
import './chat-footer.scss'
import {MentionIcon} from "@/shared/assets/icons";
import {PaperAirplaneMetaSvg} from "@/shared/assets/icons/svg/paper-airplane";
import {SendMessage} from "@/widgets/chat/lib/send-message";
import {motion} from 'framer-motion'
import useStore from "@/hooks/useStore";
import {EmojiButton} from "@/widgets/chat/ui/chat-footer/ui/emodji-button";
import Image from "next/image";
import {CloseOutlined} from "@ant-design/icons";
import {useDebounce} from "@/hooks/useDebounce";

interface props {
    chatId: string;
}

export const ChatFooter = ({chatId}: props) => {
    const {addMessage, chats, changeLocalMessage, updateMessageStatus, editMessage, selectEditMessage} = useStore();
    const [msg, setMsg] = useState<string>(chats[chatId]?.message ? chats[chatId].message : '')
    const [editMode, setEditMode] = useState(false)
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (chats[chatId]?.editMessage) {
            const messageData = chats[chatId].messages.find((m) => m.id === chats[chatId].editMessage)
            if (!messageData) return;
            setEditMode(true)
            setMsg(messageData.message)
            setFileList(messageData?.files ? messageData.files : [])
        }
    }, [chats[chatId]?.editMessage]);

    const sendMsg = useCallback(async () => {
        console.log(fileList, 'pre files')
        if (editMode) {
            editMessage(chatId, chats[chatId].editMessage, msg, fileList)
            selectEditMessage(chatId, '')
            setMsg('')
            setFileList([])
            setEditMode(false)
        } else {
            SendMessage(chatId, msg, 'ME', addMessage, fileList, updateMessageStatus)
                .then(() => {
                    setMsg('')
                    setFileList([])
                    changeLocalMessage(chatId, '')
                })
                .catch((err) => {
                    console.error(`Error sending message: ${err}`)
                })
        }
    }, [msg, fileList])

    const debouncedHandleInputChange = useDebounce(() => {
        changeLocalMessage(chatId, msg)
    }, 300);

    const handleChangeMessage = (e) => {
        setMsg(e.target.value)
        if (!editMode) {
            debouncedHandleInputChange()
        }
    }

    const handleAddEmoji = (emoji: string) => {
        setMsg(prevState => `${prevState}${emoji}`)
        debouncedHandleInputChange()
    }

    const uploadProps = {
        name: 'image',
        type: 'image/',
        fileList,
        beforeUpload: file => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                console.error('You can only upload image files!');
                return;
            }
            setFileList([file])
            return;
        },
        showUploadList: false,
    };

    return (
        <div className={'above-footer'}>
            {fileList[0] &&
                <div className={'message-pictures'}>
                    <motion.div
                        initial={{opacity: 0, scale: 0.75}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{
                            duration: 1,
                            delay: .4,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                        className={'message-pictures__image-block'}
                    >
                        <Image
                            src={URL.createObjectURL(fileList[0])}
                            alt={''}
                            height={160}
                            width={160}
                            className={'message-pictures__image-block__image'}
                        />
                        <div
                            onClick={() => {
                                setFileList([])
                            }}
                            className={'message-pictures__image-block__delete-mark'}
                        >
                            <CloseOutlined className={'message-pictures__image-block__delete-mark__mark-size'}/>
                        </div>
                    </motion.div>
                </div>
            }
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{
                    duration: 1,
                    delay: .5,
                    ease: [0, 0.71, 0.2, 1.01]
                }}
                className={'chat-footer'}
            >
                <EmojiButton chatId={chatId} onChangeText={handleAddEmoji}/>
                {editMode &&
                    <p className={'chat-footer__editing'}>
                        Редактирование
                    </p>
                }
                <Input
                    value={msg}
                    onChange={handleChangeMessage}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMsg();
                        }
                    }}
                    className={'chat-footer__input'}
                    placeholder={'Start typing...'}
                />
                <div className={'chat-footer__send-block'}>
                    <Upload
                        //@ts-ignore
                        {...uploadProps}
                    >
                        <Button
                            type={'text'}
                            className={'button-ghost button-mention'}
                        >
                            <MentionIcon/>
                        </Button>
                    </Upload>
                    <Button
                        type={'text'}
                        className={'button-ghost send-button'}
                        onClick={sendMsg}
                    >
                        <PaperAirplaneMetaSvg/>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};