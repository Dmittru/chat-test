import React from 'react';
import {ChatWindow} from "@/pages/chat-id";
import {Metadata} from "next";
import {getChatMetadata} from "@/shared/lib/getChatMetadata";
import {ERROR_METADATA_REQUEST} from "@/shared/consts";

interface props {
    params: {
        chatId: string;
    };
}

export async function generateMetadata(props: props): Promise<Metadata> {
    const id = props.params.chatId;
    if (!id) return ERROR_METADATA_REQUEST;
    return await getChatMetadata(id);
}

const IndividualChatPage = async (props: props) => {
    return (<ChatWindow {...props}/>);
};

export default IndividualChatPage;