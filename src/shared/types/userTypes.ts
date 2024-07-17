export interface IUser {
    id: string,
    nickname: string,
    avatar: string,
    online: boolean,
    vacancy: string,
    lastSeen: Date | string,
}