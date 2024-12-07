import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Auth';
import WelcomeImage from '../components/welcome_image';


const LoginPage = ({ navigation }: any) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    

    const validateEmail = (userEmail: string): boolean => {
        const regularExp = /\S+@\S+\.\S+/;
        return regularExp.test(userEmail);
    };

    const onLogin = async () => {
        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Invalid Password', 'Password should be at least 8 characters long');
            return;
        }

        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            

            navigation.navigate('HomePage');
        } catch (error: any) {
            let errorMessage = 'Login failed';
            switch (error.code) {
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password';
                    break;
                default:
                    errorMessage = error.message;
            }
            Alert.alert('Login Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Check if user is already signed in
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Only set email in the user context
                navigation.navigate('HomePage');
            }
        });

        // Cleanup the listener when the component is unmounted
        return () => unsubscribe();
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <WelcomeImage />
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
            <View style={styles.loginButtonContainer}>
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={onLogin}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.register_button}>New user? Register</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10,
    },
    loginButtonContainer: {
        marginTop: 20,
    },
    loginButton: {
        backgroundColor: '#5e9cfa',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    forgotPassword: {
        textAlign: 'center',
        color: '#5e9cfa',
        marginTop: 10,
    },
    register_button: {
        textAlign: 'center',
        color: '#5e9cfa',
        marginTop: 10,
    },
});

export default LoginPage;