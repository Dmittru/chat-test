import {CHATS, ERROR_METADATA_REQUEST} from "@/shared/consts";

export async function getChatMetadata(id: string) {
    if(!id) return ERROR_METADATA_REQUEST;
    const chatData = CHATS.find((c)=>c.id === id);
    if(!chatData) return ERROR_METADATA_REQUEST;
    return {
        title: `${chatData.name} | Chat ⭐`,
        description: 'This is your magic chat'
    }
}