import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Page4 = () => {
    const [text, setText] = useState('');

    const GetGreeting = ({ text}: any) => {
        if (text !== '') {
            return (
                <Text style={styles.outputText}>Hello, {text}</Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Greeting Generator</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your Name here"
                    onChangeText={setText}
                    value={text}
                />
                <GetGreeting text={text} />
                <TouchableOpacity style={styles.button} onPress={() => setText('')}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 40,
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 20,
        width: '80%',
    },
    outputText: {
        marginTop: 20,
        fontSize: 26,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#8882d9',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Page4;
