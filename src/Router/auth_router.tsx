import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegisterScreen from "../Screens/Auth/RegisterScreen";
import { AuthRoutesNames } from "./routeNames";
import { Text } from "react-native";

const AuthStack = createNativeStackNavigator();

const authRoutes = (
    <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name={AuthRoutesNames.LOGIN} component={LoginScreen} options={{
            headerTitle: (props) => <Text {...props}>Login</Text>
        }}/>
        <AuthStack.Screen name={AuthRoutesNames.REGISTER} component={RegisterScreen} options={{
            headerTitle: (props) => <Text {...props}>Register</Text>
        }}/>
    </AuthStack.Navigator>
);

export default authRoutes;