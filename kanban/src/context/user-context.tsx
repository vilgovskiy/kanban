import React from "react";

interface UserContext {
    loggedIn: boolean,
    userID: number | null,
    boards: number[]
}

export const UserContext= React.createContext<UserContext>({
    loggedIn: false,
    userID: null,
    boards: []
})