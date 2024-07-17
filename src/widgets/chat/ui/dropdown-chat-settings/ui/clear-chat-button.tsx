'use client'
import React, {useState} from 'react';
import {Button, Modal} from "antd";
import useStore from "@/hooks/useStore";
import {DeleteOutlined} from "@ant-design/icons";

interface props {
    chatId: string;
}

export const ClearChatButton = ({chatId}: props) => {
    const {clearChat} = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(prevState => !prevState);
    };
    const handleOk = () => {
        clearChat(chatId);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                title="Clear chat?"
                open={isModalOpen}
                onOk={handleOk}
                okType={'danger'}
                okText={'Clear'}
                onCancel={handleCancel}
            >
                <p>
                    This action will delete all messages in the chat. It will be impossible to restore them.
                </p>
            </Modal>
            <Button
                rel="noopener noreferrer"
                className={'button-ghost dropdown-menu__item dropdown-menu__item clear-chat-btn'}
                onClick={() => {
                    showModal()
                }}
                style={{
                    color: '#CC0000FF',
                }}
            >
                Clear Chat <DeleteOutlined/>
            </Button>
        </div>
    );
};