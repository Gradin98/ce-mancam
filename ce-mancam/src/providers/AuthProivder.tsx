import React from "react";

export const AuthContext = React.createContext({
    isAuthenticate: false,
    update: () => {}
})