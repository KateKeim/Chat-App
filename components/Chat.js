import { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
  
    
const Chat = ({ route, navigation }) => {
    const {name, color} = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
      }


    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hi! how was your day? Meaw~",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Jackson",
                    avatar: "http://placekitten.com/140/140",
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
              },
            ]);
        
        navigation.setOptions({title: name});
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: color}]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
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