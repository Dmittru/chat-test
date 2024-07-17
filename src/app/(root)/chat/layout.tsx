import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Chats 💬",
    description: "Start chatting here!",
};

const ChatLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default ChatLayout;