import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from '../utils/constantScreenName';
import {
  CalendarScreen,
  DangKyHP,
  DangKyHPScreen,
  HomeScreen,
  MarkScreen,
  ProfileScreen,
  ProgressStepsUI,
  NotificationScreen,
  ChuongTrinhKhungScreen,
} from '../screen/TabScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../themes/color';
import SignInScreen from '../screen/StackScreen/SignInScreen';

export const Icon = {
  entypo: 'Entypo',
  ionicons: 'Ionicons',
  materialIcons: 'MaterialIcons',
  fontAwesome: 'FontAwesome',
};
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const renderIcon = (typeIcon, focused, textname, iconName) => {
  switch (typeIcon) {
    case Icon.fontAwesome:
      return (
        <>
          <FontAwesome
            name={iconName}
            color="gray"
            size={22}
            style={{ color: focused ? '#4070f3' : 'gray' }}
          />
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#4070f3' : 'gray',
              width: 60,
              textAlign: 'center',
            }}
          >
            {textname}
          </Text>
        </>
      );
    case Icon.ionicons:
      return (
        <>
          <Ionicons
            name={iconName}
            color="gray"
            size={22}
            style={{ color: focused ? '#4070f3' : 'gray' }}
          />
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#4070f3' : 'gray',
              width: 60,
              textAlign: 'center',
            }}
          >
            {textname}
          </Text>
        </>
      );
    case Icon.materialIcons:
      return (
        <>
          <MaterialIcons
            name={iconName}
            color="gray"
            size={22}
            style={{ color: focused ? '#4070f3' : 'gray' }}
          />
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#4070f3' : 'gray',
              width: 60,
              textAlign: 'center',
            }}
          >
            {textname}
          </Text>
        </>
      );
    default:
      return (
        <>
          <Entypo
            name={iconName}
            color="gray"
            size={22}
            style={{ color: focused ? '#4070f3' : 'gray' }}
          />
          <Text
            style={{
              fontSize: 12,
              color: focused ? '#4070f3' : 'gray',
              width: 60,
              textAlign: 'center',
            }}
          >
            {textname}
          </Text>
        </>
      );
  }
};
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
        textname = 'Trang chủ';
      } else if (route.name === screenName.dkhp) {
        iconName = 'app-registration';
        typeIcon = 'MaterialIcons';
        textname = 'DKHP';
      } else if (route.name === screenName.calendar) {
        iconName = 'calendar-check-o';
        typeIcon = 'FontAwesome';
        textname = 'Lịch học';
      } else if (route.name === screenName.mark) {
        iconName = 'stacked-bar-chart';
        typeIcon = 'MaterialIcons';
        textname = 'Kết quả';
      } else {
        iconName = 'user';
        typeIcon = 'Entypo';
        textname = 'Tài khoản';
      }
      return (
        <View style={[styles.styleIcon]}>{renderIcon(typeIcon, focused, textname, iconName)}</View>
      );
    },
  };
};
const RootTab = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name={screenName.homeScreen} component={HomeScreen} />
      <Tab.Screen name={screenName.mark} component={MarkScreen} />
      <Tab.Screen name={screenName.dkhp} component={DangKyHPScreen} />
      <Tab.Screen name={screenName.calendar} component={CalendarScreen} />
      <Tab.Screen name={screenName.profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const Rootnavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenName.homeTab} component={RootTab} />
      <Stack.Screen name={screenName.signIn} component={SignInScreen} />
      <Stack.Screen name={screenName.stepDKHP} component={ProgressStepsUI} />
      <Stack.Screen name={screenName.notification} component={NotificationScreen} />
      <Stack.Screen name={screenName.chuongTrinhKhung} component={ChuongTrinhKhungScreen} />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  styleIcon: {
    width: '50%',
    height: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Rootnavigation;
