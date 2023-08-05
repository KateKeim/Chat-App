import { useState } from "react";
import { ImageBackground, StyleSheet, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity } from "react-native";

const image = require('../media/bg-image.png');

const backgroundColors = {
    taro: '#474056',
    gray: '#757083',
    vanilla: '#FFCBA5',
    green: '#B9C6AE',
};

const Start = ({navigation}) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState(backgroundColors.green);
 
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode='cover' style={styles.image}>
                <Text style={styles.appTitle}>Chitchat</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                        placeholderTextColor='#757083'
                    />
                    <Text style={styles.textColorSelector}>Choose background color:</Text>
                    <View style={styles.colorSelector}>
                        <TouchableOpacity 
                            style={[
                                styles.circle, 
                                color === backgroundColors.taro && styles.selectedCircle, 
                                {backgroundColor: backgroundColors.taro}
                            ]}
                            onPress={() => setColor(backgroundColors.taro)}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.circle, 
                                color === backgroundColors.gray && styles.selectedCircle, 
                                {backgroundColor: backgroundColors.gray}
                            ]}
                            onPress={() => setColor(backgroundColors.gray)}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.circle, 
                                color === backgroundColors.vanilla && styles.selectedCircle,
                                {backgroundColor: backgroundColors.vanilla}
                            ]}
                            onPress={() => setColor(backgroundColors.vanilla)}
                        >
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.circle, 
                                color === backgroundColors.green && styles.selectedCircle,
                                {backgroundColor: backgroundColors.green}
                            ]}
                            onPress={() => setColor(backgroundColors.green)}
                        >
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel="More options"
                        accessibilityHint="Let’s you choose to send an image or your geolocation."
                        accessibilityRole="button"
                        style={styles.button}
                        onPress={() => navigation.navigate('Chat', { name: name, color: color } )}
                    >
                        <Text>Start chatting</Text>
                    </TouchableOpacity>
                </View>
                {Platform.OS === "ios" ? (
                    <KeyboardAvoidingView behavior='padding' />
                ) : null}
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image:{
        flex: 1,
        justifyContent: 'space-between',
        //alignItems: 'center',
        padding: '6%'
    },
    appTitle: {
        flex: 2,
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
        alignSelf: 'center'
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#000000',
        padding: '6%',
        flexBasis: 160
    },
    textInput: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15
    },
    textColorSelector: {
        fontSize: 16,
        fontWeight: '300',
        color: '#8A95A5'
    },
    colorSelector: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    selectedCircle: {
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
    button: {
        alignContent: 'center',
        backgroundColor: '#757083',
        padding: 10
    }
})
export default Start;