import React from 'react';

import './chats-lobby-page.scss'
import {CHATS} from "@/shared/consts";
import Link from "next/link";

export const ChatsLobbyPage = () => {
    return (
        <div className={'fullfilled main-page'}>
            <h1 className={'main-page__header'}>
                This is all chats page. Select you favorite!
            </h1>
            {CHATS.map((chat) => {
                return (
                    <Link href={`/chat/${chat.id}`} key={chat.id}>
                        {chat.name}
                    </Link>
                )
            })}
        </div>
    );
};