'use client'
import React from 'react';
import {Button} from "antd";
import {EllipsisOutlined} from "@ant-design/icons";
import {IUser} from "@/shared/types";
import {motion} from 'framer-motion'

import './chat-header.scss'
import {timeFromNow} from "@/shared/lib/formatDate";
import {AvatarGroupClient} from "@/widgets/chat/ui/avatar-group-client";
import {DropdownChatSettings} from "@/widgets/chat/ui/dropdown-chat-settings";
import useStore from "@/hooks/useStore";

interface ChatHeaderI {
    chatId: string;
    members: IUser[];
    name: string;
    lastSeen: Date | string | undefined;
    chatId: string;
}

export const ChatHeader = ({chatId, members, name, lastSeen}: ChatHeaderI) => {
    const {chats} = useStore()
    const initChat = chats[chatId];

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 1,
                delay: 0.3,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className={'chat-header'}
        >
            <div className={'chat-header__block-left'}>
                <AvatarGroupClient members={JSON.stringify(initChat?.members || [])}/>
            </div>
            <div className={'chat-header__block-center'}>
                <h6 className={'chat-header__title'}>
                    {initChat?.name ? initChat.name : 'Not Exists'}
                </h6>
                <p className={'chat-header__text-secondary'}>
                    {initChat?.lastSeen ? `last seen ${timeFromNow(initChat.lastSeen)}` : 'Chat is not defined'}

                </p>
            </div>
            <div className={'chat-header__block-right'}>
                <DropdownChatSettings chatId={chatId}/>
            </div>
        </motion.div>
    );
};