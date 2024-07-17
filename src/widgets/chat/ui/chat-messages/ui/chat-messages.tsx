'use client'
import React, {useEffect, useRef} from 'react';
import './chat-messages.scss'
import {IChat} from "@/shared/types";
import useStore from "@/hooks/useStore";
import {motion} from 'framer-motion'
import {Message} from "@/shared/ui/message";

interface props {
    chatId: string,
}

export const ChatMessages = ({chatId}: props) => {
    const {chats} = useStore()
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTo({
                top: chatMessagesRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chats[chatId]?.messages]);

    return (
        <motion.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className={`chat-messages`}
            ref={chatMessagesRef}
        >
            {chats[chatId] && chats[chatId].messages.length > 0 ?
                <>
                    {
                        chats[chatId].messages.map((msg, key) => {
                            const firstMsgFlag = chats[chatId].messages[key - 1] ? chats[chatId].messages[key - 1].user !== msg.user : true;
                            return (
                                <Message chatId={chatId} isFirst={firstMsgFlag} message={msg} key={msg.id}/>
                            )
                        })
                    }
                </> :
                <div className={'stretched flex-center'}>
                    <p className={'text-banner'}>
                        Start Chatting
                    </p>
                </div>
            }
        </motion.div>
    );
};