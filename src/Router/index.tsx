import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authRoutes from "./auth_router";

const Router: React.FC = () => {

    return (
        <NavigationContainer>
            {authRoutes}
        </NavigationContainer>
    );
}

export default Router;