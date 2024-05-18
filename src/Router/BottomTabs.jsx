import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import LobbyScreen from '../Screens/Game/LobbyScreen';
import UserDetailsScreen from '../Screens/Game/UserDetailsScreen';

import { BottomTabsNames } from './routeNames';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={BottomTabsNames.LOBBY} component={LobbyScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} /> 
          ),
          title: 'Lobby',
        }}
      />
      <Tab.Screen name={BottomTabsNames.USERDETAILS} component={UserDetailsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} /> 
          ),
          title: 'User Details',
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabs;