import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../Screens/Auth/LoginScreen";
import RegisterScreen from "../Screens/Auth/RegisterScreen";
import { AuthRoutesNames, BottomTabsNames, GameRoutesNames } from "./routeNames";
import { Text } from "react-native";
import BottomTabs from "./BottomTabs";
import LobbyScreen from "../Screens/Game/LobbyScreen";
import TableScreen from "../Screens/Game/TableScreen";

const GameStack = createNativeStackNavigator();

const gameRoutes = (
    <GameStack.Navigator>
        <GameStack.Screen name="Game" component={BottomTabs} options={{ headerShown: false }}/>
        <GameStack.Screen name={BottomTabsNames.LOBBY} component={LobbyScreen} options={{
            headerTitle: (props) => <Text {...props}>Lobby</Text>
        }}/>
         <GameStack.Screen name={GameRoutesNames.TABLE} component={TableScreen} options={{
            headerTitle: (props) => <Text {...props}>Game</Text>
        }}/>
    </GameStack.Navigator>
);

export default gameRoutes;