'use client'
import React from 'react';
import './dropdown-chat-settings.scss'
import {EllipsisOutlined} from "@ant-design/icons";
import {Button, Dropdown} from "antd";
import {SwitchThemeButton} from "@/widgets/chat/ui/dropdown-chat-settings/ui/switch-theme-button";
import {ClearChatButton} from "@/widgets/chat/ui/dropdown-chat-settings/ui/clear-chat-button";
import {LeaveChatButton} from "@/widgets/chat/ui/dropdown-chat-settings/ui/leave-chat-button";
import {ChangeChatNameButton} from "@/widgets/chat/ui/dropdown-chat-settings/ui/change-chat-name-button";

interface props {
    chatId: string;
}

export const DropdownChatSettings = ({chatId}: props) => {

    const items = [
        {
            key: 'switch-theme-btn',
            label: (
                <SwitchThemeButton/>
            ),
        },
        {
            key: 'rename-chat-btn',
            label: (
                <ChangeChatNameButton chatId={chatId}/>
            ),
        },
        {
            key: 'clear-chat-btn',
            label: (
                <ClearChatButton chatId={chatId}/>
            ),
        },
        {
            key: 'leave-chat-btn',
            label: (
                <LeaveChatButton chatId={chatId}/>
            ),
        },
    ];

    return (
        <Dropdown
            className={'dropdown-menu'}
            menu={{
                items,
            }}
            placement="topLeft"
        >
            <Button
                type={'text'}
                className={'button-ghost ellipsis-button'}
            >
                <EllipsisOutlined/>
            </Button>
        </Dropdown>
    );
};