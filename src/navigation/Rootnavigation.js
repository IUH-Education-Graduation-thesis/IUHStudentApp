import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from '../utils/constantScreenName';
import { AnnounceScreen, HomeScreen, ProfileScreen } from '../screen/TabScreen';
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../themes/color';
import { SignInScreen } from '../screen/StackScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => {
    return {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: COLORS.lightBlue },
        tabBarIcon: ({ focused }) => {
            let iconName;
            let typeIcon;
            let textname;
            if (route.name === screenName.homeScreen) {
                iconName = 'home';
                typeIcon = 'Entypo';
                textname = "Trang chủ"
            }
            else if (route.name === screenName.announce) {
                iconName = 'notifications';
                typeIcon = 'Ionicons';
                textname = "Thông báo"
            }
            else {
                iconName = 'user';
                typeIcon = 'Entypo';
                textname = "Tài khoản"
            }
            return (
                <View style={[styles.styleIcon,]}>
                    {typeIcon === 'Ionicons' ?
                        (<>
                            <Ionicons name={iconName} color="gray" size={22} style={{ color: focused ? "#4070f3" : "gray" }} />
                            <Text style={{ fontSize: 13, color: focused ? "#4070f3" : "gray" }}>{textname}</Text>
                        </>)
                        : (<>
                            <Entypo name={iconName} color="gray" size={22} style={{ color: focused ? "#4070f3" : "gray" }} />
                            <Text style={{ fontSize: 13, color: focused ? "#4070f3" : "gray" }}>{textname}</Text>
                        </>
                        )}
                </View>
            );
        }
    }
}
const RootTab = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Stack.Screen name={screenName.homeScreen} component={HomeScreen} />
            <Stack.Screen name={screenName.announce} component={AnnounceScreen} />
            <Stack.Screen name={screenName.profile} component={ProfileScreen} />
        </Tab.Navigator>
    )
}
const Rootnavigation = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screenName.signIn} component={SignInScreen} />
            <Stack.Screen name={screenName.homeTab} component={RootTab} />
        </Stack.Navigator >
    );
}
const styles = StyleSheet.create({
    styleIcon: {
        width: "50%",
        height: "80%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },

})
export default Rootnavigation