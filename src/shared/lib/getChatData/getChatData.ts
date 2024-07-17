import {CHATS} from "@/shared/consts";

export async function getChatData(id: string){
    if(!id) return;
    const chatData = CHATS.find((c)=>c.id === id);
    if(!chatData) return;
    return chatData
}