import { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
  
    
const Chat = ({ route, navigation, db }) => {
    const {name, color} = route.params;
    const { userID } = route.params
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      navigation.setOptions({ title: name });
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
        setMessages(newMessages);
      })
      return () => {
        if (unsubMessages) unsubMessages();
      }
     }, []);

    useEffect(() => {
    //Setting the title to 'name'
    navigation.setOptions({ title: name })
  }, []);

  //Add new messages to the existing messages
const onSend = (newMessages) => {
  addDoc(collection(db, "messages"), newMessages[0])
}


    return (
        <View style={[styles.container, {backgroundColors: color}]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
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