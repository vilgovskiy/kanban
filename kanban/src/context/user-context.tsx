import React from "react";

interface Board {
    id: number,
    name: string,
    description: string,
    isOwner: boolean
}

interface UserContext {
    loggedIn: boolean,
    userID: number | null,
    boards: [Board] | null
}

export const UserContext= React.createContext<UserContext>({
    loggedIn: false,
    userID: null,
    boards: null
})