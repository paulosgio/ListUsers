import axios from "axios";
import { create } from "zustand";

interface IUser {
    id: number;
    name: string;
    email: string;
    active: boolean;
}

interface IlistUsersState {
    user: IUser[] | null
    getUsers: (listId: number)=> Promise<void>
    delete: (listId: number, userId: number)=> Promise<void>
    add: (listId: number, userId: number)=> Promise<void>
    changeStatus: (listId: number, userId: number, status: boolean)=> Promise<void>
}

export const useListUsersState = create<IlistUsersState>((set)=> ({
    user: [],
    add: async (listId: number, userId: number)=> {
        //set({user: })
    },
    changeStatus: async ()=> {

    },
    delete: async ()=> {

    },
    getUsers: async (listId: number)=> {
        const response = await axios.get(`/`)
    }
}))