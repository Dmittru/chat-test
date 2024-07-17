import {USER_LIST} from "@/shared/consts/users";
import {IChat} from "@/shared/types";

export const CHATS: IChat[] = [
    {
        id: '1',
        name: '🦄 Team Unicorns',
        members: [...USER_LIST],
        messages: [
            {
                message: `Hi! This is your first-initial message before you start chatting!
What you need to know:
1) You can switch theme from dark to light
2) You can clear ALL messages
3) You can rename chat (our boss enabled it...)
4) You can leave chat and this is place will be cleared. (And re-inited via config with this message🤭)
All this functions can be reached on top right button with ellipses
5) Mentions applying when you call someone as his name @COME_HERE
6) Uploading files on icon of mention (1 file, but only for now)
7) Custom emojis that boss applied at left
8) Message can be deleted or edited. Whatever you want
9) Be nice.`,
                id: 'msg_1',
                sent: '2024-07-15T12:20:31.999Z',
                modified: false,
                status: 'read',
                files: undefined,
                user: '1',
            },
        ],
        lastSeen: '2024-07-15T12:20:31.999Z',
    },
]