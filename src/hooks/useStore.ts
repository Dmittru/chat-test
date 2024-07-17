import create from 'zustand';
import {persist} from 'zustand/middleware';
import {IChat, IMessage} from "@/shared/types";

interface localChat extends IChat {
    message: string;
    editMessage: string;
}

interface Chats {
    theme: string;
    chats: { [key: string]: localChat };
    switchTheme: () => void;
    createChat: (chat: IChat) => void;
    getMessages: (chatId: string) => IMessage[];
    addMessage: (chatId: string, message: IMessage) => void;
    removeMessage: (chatId: string, messageId: string) => void;
    editMessage: (chadId: string, messageId: string, text: string, files) => void;
    selectEditMessage: (chadId: string, messageId: string) => void;
    updateMessageStatus: (chadId: string, messageId: string, status: string) => void;
    removeChat: (chatId: string) => void;
    clearChat: (id: string) => void;
    renameChat: (name: string, chatId: string) => void;
    changeLocalMessage: (chatId: string, text: string) => void;
}

const useStore = create<Chats>(persist(
    (set) => ({
        chats: {},
        theme: 'light',

        switchTheme: () => set((state) => {
            if (state.theme === 'light') {
                return {theme: 'dark'}
            } else {
                return {theme: 'light'}
            }
        }),

        createChat: (chat) => set((state) => {
            if (state.chats[chat.id]) {
                return state;
            }
            return {
                chats: {
                    ...state.chats,
                    [chat.id]: {...chat},
                },
            };
        }),

        addMessage: (chatId, message) => set((state) => {
            const chat = state.chats[chatId];
            if (!chat) return state;

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...chat,
                        messages: [...chat.messages, message],
                    },
                },
            };
        }),

        removeMessage: (chatId, messageId) => set((state) => {
            const chat = state.chats[chatId];
            if (!chat) return state;

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...chat,
                        messages: chat.messages.filter((msg) => msg.id !== messageId),
                    },
                },
            };
        }),

        editMessage: (chatId, messageId, text, files) => set((state) => {
            const chat = state.chats[chatId];
            if (!chat) return state;
            let editMessage = chat.messages.find((m) => m.id === messageId)
            let editMessageKey = chat.messages.findIndex((m) => m.id === messageId)
            if (!editMessage || !editMessageKey) return state;
            editMessage.message = text;
            editMessage.modified = true;
            if(files && files.length > 0){
                editMessage.files = files;
            }
            let newMessages = [...state.chats[chatId].messages]
            newMessages[editMessageKey] = editMessage;
            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...chat,
                        editMessage: '',
                        messages: [...newMessages],
                    },
                },
            };
        }),

        selectEditMessage: (chatId, messageId) => set((state) => {
            const chat = state.chats[chatId];
            if (!chat) return state;
            let editMessage = chat.messages.find((m) => m.id === messageId)
            if (!editMessage) return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...chat,
                        editMessage: '',
                    },
                },
            };
            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...chat,
                        editMessage: messageId,
                    },
                },
            };
        }),

        updateMessageStatus: (chatId, messageId, status) => set((state) => {
            const chat = state.chats[chatId];
            if (!chat) return state;
            let editMessage = chat.messages.find((m) => m.id === messageId)
            let editMessageKey = chat.messages.findIndex((m) => m.id === messageId)
            if (!editMessage || !editMessageKey) return state;
            editMessage.status = status;
            let newMessages = [...state.chats[chatId].messages]
            newMessages[editMessageKey] = editMessage;
            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...chat,
                        messages: [...newMessages],
                    },
                },
            };
        }),

        removeChat: (chatId) => set((state) => {
            const chat = state.chats[chatId];
            if (!chat) return state;

            const filteredChats = state.chats
            delete filteredChats[chatId]

            return {
                chats: {
                    ...filteredChats,
                },
            };
        }),

        clearChat: (id) => set((state) => {
            if (!state.chats[id]) return state;

            return {
                chats: {
                    ...state.chats,
                    [id]: {
                        ...state.chats[id],
                        messages: [],
                    },
                },
            };
        }),

        renameChat: (name, chatId) => set((state) => {
            if (!state.chats[chatId]) return state;

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        name: name,
                    },
                },
            };
        }),

        changeLocalMessage: (chatId, text) => set((state) => {
            if (!state.chats[chatId]) return state;

            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...state.chats[chatId],
                        message: text,
                    },
                },
            };
        }),
    }),
    {
        name: 'chat-storage',
        // getStorage: () => localStorage,
    }
));

export default useStore;
