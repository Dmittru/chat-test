import {IUser} from "@/shared/types/userTypes";
import {IMessage} from "@/shared/types/messageTypes";

export interface IChat {
    id: string,
    name: string,
    members: IUser[],
    messages: IMessage[],
    lastSeen: Date | string,
}