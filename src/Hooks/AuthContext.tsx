import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserDetals, login, register } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { atob } from 'react-native-quick-base64'
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

interface IAuthContext {
    token: string;
    email: string;
    id: string;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
    token: "",
    email: "",
    id: "",
    login: async () => {},
    register: async () => {},
    isLoading: false,
    logout: async () => {}
});

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

    const [token, setToken] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isTokenExpired = (token: string): boolean => {
    if (token) {
        const [, payload] = token.split(".");
        // Replace URL-specific base64url characters with standard base64 characters
        let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        // Pad base64 string to a length that is a multiple of 4
        while (base64.length % 4 !== 0) {
        base64 += '=';
        }
        try {
        const decodedPayload = atob(base64);
        const data = JSON.parse(decodedPayload);
        return data.exp * 1000 < Date.now();
        } catch (e) {
        console.error("Failed to decode JWT:", e);
        // Handle the error according to your application's needs
        return true; // Assuming token is expired if it cannot be processed
        }
    }
    return true;
};

      

    useEffect(() => {
        setIsLoading(true);
        AsyncStorage.getItem("token").then((value) => {
            if (value) {
                if (isTokenExpired(value)) {
                    AsyncStorage.removeItem("token");
                    value = "";
                }
                else{
                    setToken(value);
                    console.log(value);
                    getUserDetals(value).then((user) => {
                        console.log("user-ul este", user.user.email);
                        setEmail(user.user.email);
                        setId(user.user.id);
                    });
                }
                
            }
        }).finally(() => {
            setIsLoading(false);
        }

        );
    }
    , []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const result = await login(email, password);
            console.log(result);
            AsyncStorage.setItem("token", result);
            setToken(result);
            getUserDetals(result).then((user) => {
                setEmail(user.user.email);
                setId(user.user.id);
            });
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
            getUserDetals(result).then((user) => {
                setEmail(user.user.email);
                setId(user.user.id);
            });
        } 
        catch (error) {
            console.log(error);
        }
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        setToken("");
    };

    return (
        <AuthContext.Provider value={{
            token,
            email,
            id,
            login: handleLogin,
            register: handleRegister,
            isLoading: isLoading,
            logout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => useContext(AuthContext);