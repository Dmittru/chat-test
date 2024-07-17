import React, {useState} from 'react';
import useStore from "@/hooks/useStore";
import {Button, Input, Modal} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";

interface props {
    chatId: string;
}

export const ChangeChatNameButton = ({chatId}: props) => {
    const {renameChat, chats} = useStore();
    const [newName, setNewName] = useState(chats[chatId] ? chats[chatId].name : '')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(prevState => !prevState);
    };
    const handleOk = () => {
        if(!newName) return;
        renameChat(newName, chatId);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                title="Set new chat name"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Save'}
                onCancel={handleCancel}
            >
                <Input
                    value={newName}
                    onChange={(e) => {
                        setNewName(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleOk();
                        }
                    }}
                    placeholder={'New name for chat'}
                />
            </Modal>
            <Button
                rel="noopener noreferrer"
                className={'button-ghost dropdown-menu__item dropdown-menu__item clear-chat-btn'}
                onClick={() => {
                    showModal()
                }}
            >
                Rename chat <EditOutlined />
            </Button>
        </div>
    );
};
