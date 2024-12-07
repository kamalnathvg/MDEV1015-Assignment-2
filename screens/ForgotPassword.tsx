// ForgotPassword.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { auth , sendPasswordResetEmail} from './Auth'; // Assuming auth is initialized here

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter an email address.");
      return;
    }

    sendPasswordResetEmail(auth , email)
      .then(() => {
        Alert.alert(
          "Success",
          "A password reset email has been sent. Please check your inbox."
        );
        navigation.navigate('Login'); // Navigate back to login screen after success
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Enter your email address to reset your password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
          paddingLeft: 10,
        }}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ForgotPassword;
