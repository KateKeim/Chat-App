import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";

// import Async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// import feature access to user camera
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
    
const Chat = ({ route, navigation, db, isConnected, storage }) => {
    const {name, color} = route.params;
    const { userID } = route.params
    const [messages, setMessages] = useState([]);

    const loadCachedMessages = async () => {
      const cachedMessages = (await AsyncStorage.getItem('messages')) || '[]';
      setMessages(JSON.parse(cachedMessages));
    };

    let unsubMessages;

    useEffect(() => {
      navigation.setOptions({ title: name });

      if (isConnected === true) {
        if (unsubMessages) unsubMessages();
        unsubMessages === null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      const unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach(doc => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up function
    return () => {
      if (unsubMessages) {
        unsubMessages();
      }
    };
  }, [isConnected]);

  const cachedMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  //   useEffect(() => {
  //   //Setting the title to 'name'
  //   navigation.setOptions({ title: name })
  // }, []);

  //Add new messages to the existing messages
const onSend = (newMessages) => {
  addDoc(collection(db, "messages"), newMessages[0])
}

// Prevent GiftedChat rendering Send Button
const renderInputToolbar = (props) => {
  // renderInputToolbar function
  if (isConnected) return <InputToolbar {...props} />;
  else return null;
};

const renderCustomActions = (props) => {
  // renderCustomActions function
  return <CustomActions onSend={onSend} userID={userID} storage={storage} {...props} />;
};

const renderCustomView = (props) => {
  const { currentMessage } = props;
  if (currentMessage.location) {
    return (
      <MapView
        style={{
          width: 150,
          height: 100,
          borderRadius: 13,
          margin: 3,
        }}
        region={{
          latitude: currentMessage.location.latitude,
          longitude: currentMessage.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
  return null;
};


    return (
        <View style={[styles.container, {backgroundColors: color}]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                  _id: userID,
                  name,
                }}
            />
            
        </View>
    )
}

const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#228B22"
        },
        left: {
          backgroundColor: "#fff"
        }
      }}
    />
  }

const styles = StyleSheet.create({
    container: {
        flex: 1
        // justifyContent: 'center',
        // alignItems: 'center'
    }
});

export default Chat;