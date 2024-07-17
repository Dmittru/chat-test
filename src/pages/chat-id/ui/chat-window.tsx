import React from 'react';

import './chat-window.scss'
import {getChatData} from "@/shared/lib/getChatData";
import {ChatComponent} from "@/widgets/chat";
import {ChatError} from "@/widgets/chat/ui/chat-error";

interface props {
    params: {
        chatId: string;
    };
}

export const ChatWindow = async ({params}: props) => {
    const chatData = await getChatData(params.chatId);
    return (
        <div className={'fullfilled'}>
            {chatData ?
                <ChatComponent chatData={chatData}/> :
                <ChatError/>
            }
        </div>
    );
};