import Icon from 'react-native-vector-icons/Feather';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import React from 'react';

export const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarStyle: {
    backgroundColor: '#fff',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    height: 60,
  },
  tabBarLabelStyle: {
    fontSize: 12,
  },
};

export const getTabBarIcon = (
  iconName: string,
  color: string,
): (() => React.ReactNode) => {
  return () => React.createElement(Icon, {name: iconName, size: 22, color});
};

export const getTabScreenOptions = (iconName: string) => ({
  tabBarIcon: ({focused}: {focused: boolean}) =>
    React.createElement(Icon, {
      name: iconName,
      size: 22,
      color: focused ? 'gold' : '#999',
    }),
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: '#999',
});
