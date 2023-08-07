// importing the two screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Firestore noSQL database
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// import netInfo to report the internet connection
import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

// creating the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  const connectionStatus = useNetInfo();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBFyfYpwVUv0km4Vq8lLN_joqgjWcgixEc",
    authDomain: "chat-app-1986c.firebaseapp.com",
    projectId: "chat-app-1986c",
    storageBucket: "chat-app-1986c.appspot.com",
    messagingSenderId: "610026366048",
    appId: "1:610026366048:web:b51a1209a88b2eda4c4f05",
    measurementId: "G-M0R7GWP031"
  };

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen 
          name="Start"
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;