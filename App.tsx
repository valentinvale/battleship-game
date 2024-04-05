import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Router from './src/Router';
import { AuthContextProvider } from './src/Hooks/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
