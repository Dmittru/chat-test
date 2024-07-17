import React, {useState} from 'react';
import useStore from "@/hooks/useStore";
import {Button, Modal} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";

interface props {
    chatId: string;
}

export const LeaveChatButton = ({chatId}: props) => {
    const {removeChat} = useStore();
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(prevState => !prevState);
    };
    const handleOk = () => {
        removeChat(chatId);
        router.push('/chat')
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Modal
                title="Leave chat?"
                open={isModalOpen}
                onOk={handleOk}
                okText={'Leave'}
                okType={'danger'}
                onCancel={handleCancel}
            >
                <p>
                    This action will delete this chat. It will be impossible to restore it.
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
                Leave Chat <CloseOutlined />
            </Button>
        </div>
    );
};