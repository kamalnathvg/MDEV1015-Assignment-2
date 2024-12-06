import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { auth } from './Auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import WelcomeImage from '../components/welcome_image';

const RegisterPage = ({navigation}: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const validateEmail = (userEmail: string): boolean => {
        const regularExp = /\S+@\S+\.\S+/;
        return regularExp.test(userEmail);
    };
    const onRegister = async () => {
        if(!validateEmail(email)){
            Alert.alert('Invalid Email', 'Please enter a valid email');
        }else if(password.length < 8){
            Alert.alert('Invalid Password', 'Password should be atleast ');
        }else if(password !=  confirmPassword){
            Alert.alert('Password Mismatch', 'Make sure passwords match');
        }else{
            try {
                await createUserWithEmailAndPassword(auth,email, password);
                navigation.pop();
            } catch (error: any) {
               Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <SafeAreaView>
        <WelcomeImage/>
        <Text style={styles.title}>Register an Account</Text>
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
        <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        />
        <Button
        title="Register"
        onPress={onRegister}
        color={'blue'}

         />
        <TouchableOpacity
        onPress={() =>{
            navigation.pop();
        }}
        >
            <Text style={styles.login_button}>Already a user? Login</Text>
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
    register_button:{
        marginHorizontal:40,
        backgroundColor: 'blue',
    },
    login_button:{
        textAlign: 'center',
    },
});

export default RegisterPage;
