import { create } from "zustand";
import { api } from "../api/api";

interface IUser {
    id: number;
    name: string;
    email: string;
}

interface IlistUsersState {
    users: IUser[] 
    getUsers: ()=> Promise<void>
    delete: (listId: number, userId: number)=> Promise<void>
    add: (listId: number, userId: number)=> Promise<void>
    changeStatus: (listId: number, userId: number, status: boolean)=> Promise<void>
}

export const useListUsersState = create<IlistUsersState>((set)=> ({
    users: [],
    add: async (listId: number, userId: number)=> {
        const response = await api.post(`/lists/${listId}/users`, { userId })
        set((state)=> ({
            users: [...state.users, response.data]
        }))
    },
    changeStatus: async ()=> {

    },
    delete: async ()=> {

    },
    getUsers: async ()=> {
        try {
            const response = await api.get(`/users`)
            console.log(response)
            console.log(response.headers);
            set({ users: response.data })
        } catch (error) {
            console.log(error);
        }
    }
}))