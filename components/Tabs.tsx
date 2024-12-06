
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page1 from "../screens/Page1";
import Page2 from "../screens/Page2";
import Page3 from "../screens/Page3";
import Page4 from "../screens/Page4";
import Page5 from "../screens/Page5";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import {auth} from './../screens/Auth'
const Tab = createBottomTabNavigator()

const Tabs = ({navigation}: any) => {
    if(auth.currentUser == null){
        navigation.navigate("Login")
    }

    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: 'tomato',
            headerShown: false,
            tabBarLabel: () => null,
            tabBarInactiveTintColor: 'grey',
            tabBarStyle:{
                backgroundColor: 'lightblue'
            },
            headerStyle: {
                backgroundColor: 'lightblue'
            },

        }}
        >
            <Tab.Screen
            name="1"
            options={{
                tabBarIcon: ({focused}) => (
                <FontAwesome5
                    name={"cat"}
                    size={25}
                    color={focused ? "tomato" : "black"}
                />
                )
            }}>
                {() => <Page1/>}
            </Tab.Screen>
            <Tab.Screen
            name="2"
            options={{
                tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons
                    name={"counter"}
                    size={25}
                    color={focused ? "tomato" : "black"}
                />
                )
            }}
            >
                {() => <Page2/>}
            </Tab.Screen>

            <Tab.Screen
            name="3"
            options={{
                tabBarIcon: ({focused}) => (
                <FontAwesome5
                    name={"list-ol"}
                    size={25}
                    color={focused ? "tomato" : "black"}
                />
                )
            }}>
            {() => <Page3/>}
            </Tab.Screen>

            <Tab.Screen
            name="4"
            options={{
                tabBarIcon: ({focused}) => (
                <FontAwesome5
                    name={"envelope-open-text"}
                    size={25}
                    color={focused ? "tomato" : "black"}
                />
                )
            }}
            >
                {() => <Page4/>}
            </Tab.Screen>

            <Tab.Screen
            name="5"
            options={{
                tabBarIcon: ({focused}) => (
                <Ionicons
                    name={"color-palette-sharp"}
                    size={25}
                    color={focused ? "tomato" : "black"}
                />
                )
            }}
            >
                {() => <Page5/>}
            </Tab.Screen>
        </Tab.Navigator>
    )
}


export default Tabs;
