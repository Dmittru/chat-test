'use client'
import React, {useLayoutEffect} from 'react';
import {IChat} from "@/shared/types";
import './chat-component.scss'
import {ChatHeader} from "@/widgets/chat/ui/chat-header";
import {ChatMessages} from "@/widgets/chat/ui/chat-messages";
import {ChatFooter} from "@/widgets/chat/ui/chat-footer";
import useStore from "@/hooks/useStore";

interface props {
    chatData: IChat,
}

export const ChatComponent = ({chatData}: props) => {
    const {chats, createChat, selectEditMessage} = useStore()
    useLayoutEffect(()=>{
        if (!chats[chatData.id]) {
            createChat(chatData)
            selectEditMessage(chatData.id, '')
        }
    }, [])
    return (
        <div className={'stretched chat-component'}>
            <ChatHeader
                members={chatData.members}
                name={chatData.name}
                lastSeen={chatData.lastSeen}
                chatId={chatData.id}
            />
            <ChatMessages
                chatId={chatData.id}
            />
            <ChatFooter chatId={chatData.id}/>
        </div>
    );
};