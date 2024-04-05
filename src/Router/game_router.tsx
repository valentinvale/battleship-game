import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegisterScreen from "../Screens/Auth/RegisterScreen";
import { AuthRoutesNames, GameRoutesNames } from "./routeNames";
import { Text } from "react-native";
import TableScreen from "../Screens/Game/TableScreen";

const AuthStack = createNativeStackNavigator();

const gameRoutes = (
    <AuthStack.Navigator>
        <AuthStack.Screen name={GameRoutesNames.TABLE} component={TableScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
    </AuthStack.Navigator>
);

export default gameRoutes;