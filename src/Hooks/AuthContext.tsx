import React, { createContext, useState, useContext, useEffect } from "react";
import { login, register } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IAuthContext {
    token: string;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
    token: "",
    login: async () => {},
    register: async () => {},
    isLoading: false
});

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        AsyncStorage.getItem("token").then((value) => {
            if (value) {
                setToken(value);
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);
            console.log(result);
            AsyncStorage.setItem("token", result);
            setToken(result);
        } 
        catch (error) {
            console.log(error);
        }
    };
    const handleRegister = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            AsyncStorage.setItem("token", result);
            setToken(result);
        } 
        catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{
            token,
            login: handleLogin,
            register: handleRegister,
            isLoading: isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);