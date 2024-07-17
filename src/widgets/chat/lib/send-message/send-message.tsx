import { IMessage } from "@/shared/types";
import {USER_LIST} from "@/shared/consts";

export const SendMessage = async (chatId: string, text: string, userId, addMessage, files, updateStatus__DELETE_AFTER_PROD) => {
    if (!text && (!files || files.length === 0)) throw new Error('Empty message!');

    console.log(files)
    const message: IMessage = {
        message: text,
        id: String(Math.random()),
        sent: new Date(),
        modified: false,
        status: 'loading',
        files: files.length > 0 ? files : undefined,
        user: userId,
    };
    console.log(message)

    addMessage(chatId, message);

    setTimeout(()=>{
        updateStatus__DELETE_AFTER_PROD(chatId, message.id, 'sent')
    },500)

    setTimeout(()=>{
        updateStatus__DELETE_AFTER_PROD(chatId, message.id, 'read')
    },1000)

    //bot answer
    setTimeout(()=>{
        const botMessage: IMessage = {
            message: 'Hello World',
            id: String(Math.random()),
            sent: new Date(),
            modified: false,
            status: 'read',
            files: undefined,
            user: String(Math.floor(Math.random() * USER_LIST.length + 1)),
        };

        addMessage(chatId, botMessage)
    },1250)
};
