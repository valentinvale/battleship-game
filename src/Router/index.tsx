import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authRoutes from "./auth_router";
import { useAuth } from "../Hooks/AuthContext";
import gameRoutes from "./game_router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

const Router: React.FC = () => {

    const auth = useAuth();

    if(auth.isLoading) {
        return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        
        }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
        );
    }

    return (
        <NavigationContainer>
            {auth.token ? gameRoutes : authRoutes}
        </NavigationContainer>
    );
}

export default Router;