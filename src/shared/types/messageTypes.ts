import {IUser} from "@/shared/types/userTypes";

export interface IMessage {
    message: string,
    id: string,
    sent: Date | string,
    modified: boolean,
    status: 'loading' | 'sent' | 'read' | 'error',
    files: File[] | undefined,
    user: string,
}