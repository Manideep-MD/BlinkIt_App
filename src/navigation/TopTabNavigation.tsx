import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductList from '../screens/ProductList/ProductList';
import {View, Text, StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator();

const categories = [
  {name: 'Fruits', component: ProductList},
  {name: 'Vegetables', component: ProductList},
  {name: 'Snacks', component: ProductList},
  {name: 'Beverages', component: ProductList},
  {name: 'Dairy', component: ProductList},
];

const TopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorStyle: styles.indicator,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: {width: 'auto'},
      }}>
      {categories.map((cat, index) => (
        <Tab.Screen key={index} name={cat.name} component={cat.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    elevation: 4,
  },
  indicator: {
    backgroundColor: '#FFD700',
    height: 3,
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#333',
  },
});

export default TopTabs;
