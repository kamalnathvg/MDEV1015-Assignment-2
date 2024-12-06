import { Button, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterPage from './screens/Register';
import LoginPage from './screens/Login';
import {auth} from './screens/Auth';
import { signOut } from 'firebase/auth';
import Tabs from './components/Tabs';
import React from 'react';



const Stack = createNativeStackNavigator();

const LogOutButton = ({navigation}: any) =>{
  return (
    <View>
      <Button
      title="Log Out"
      onPress={async() => {
        await signOut(auth);
        navigation.navigate('Login');
      }}
      />
    </View>
  );
};


export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen
            name="Register"
            component={RegisterPage}
            options={{
              headerShown: false,
            }}
            />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
            headerShown: false,
            }}
            />
          <Stack.Screen
            name="HomePage"
            component={Tabs}
            options={({navigation}) =>({
              headerShown: true,
              headerLeft: () => null,
              headerRight: () => <LogOutButton navigation={navigation}/>,
            })
          }/>
        </Stack.Navigator>
      </NavigationContainer>
      );
}
