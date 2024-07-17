import React, {useCallback} from 'react';
import {SmileOutlined} from "@ant-design/icons";
import {Button, Dropdown} from "antd";
import useStore from "@/hooks/useStore";
import {EMOJIS} from "@/shared/consts";

interface props {
    chatId: string;
    onChangeText: (emoji: string) => void;
}

export const EmojiButton = ({chatId, onChangeText}: props) => {
    const {chats, changeLocalMessage} = useStore();

    const changeMessageWithEmoji = useCallback((emoji)=>{
        const preMessage = chats[chatId]?.message ? chats[chatId].message : ''
        changeLocalMessage(chatId, `${preMessage}${emoji}`)
    }, [chats[chatId]?.message])

    const items = EMOJIS.map((emoji, key) => {
        return {
            key: `emoji-${key}`,
            label: (
                <Button
                    type={'text'}
                    className={'button-ghost'}
                    onClick={() => {
                        onChangeText(emoji)
                    }}
                >
                    {emoji}
                </Button>
            )
        }
    })
    return (
        <Dropdown
            className={'dropdown-menu'}
            menu={{
                items,
            }}
            placement="bottomLeft"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                overflow: 'auto'
            }}
        >
            <Button type={'text'} className={'button-ghost button-smile'}>
                <SmileOutlined/>
            </Button>
        </Dropdown>
    );
};