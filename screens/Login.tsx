import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Auth';
import WelcomeImage from '../components/welcome_image';

const LoginPage = ({navigation}: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const validateEmail = (userEmail: string): boolean => {
        const regularExp = /\S+@\S+\.\S+/;
        return regularExp.test(userEmail);
    };
    const onLogin = async() => {
        if(!validateEmail(email)){
            Alert.alert('Invalid Email', 'Please enter a valid email');
        }else if(password.length < 8){
            Alert.alert('Invalid Password', 'Password should be atleast ');
        }else{
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigation.pop();
            } catch (error: any) {
                Alert.alert('Error', error.message);
            }
            //Login the user
        }
    };

    return (
        <SafeAreaView>
        <WelcomeImage/>
        <Text style={styles.title}>Login To Your Account</Text>
        <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        />
        <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
       <Button
        title="Login"
        onPress={onLogin}
        color={'blue'}
         />
        <TouchableOpacity
        onPress={()=>{
            console.log('navigating to register page');
            navigation.navigate('Register');
        }}
        >
            <Text style= {styles.register_button}>New user? Register</Text>
        </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title:{
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 40,
    },
    login_button:{
        marginHorizontal:40,
        backgroundColor: 'blue',
    },
    register_button:{
        textAlign: 'center',
    },

});

export default LoginPage;
