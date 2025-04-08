import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductList from '../screens/ProductList/ProductList';
import { getTabScreenOptions, tabOptions } from './navigationUtils';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name="Home" component={ProductList} options={getTabScreenOptions('home')} />
      <Tab.Screen name="Orders" component={ProductList} options={getTabScreenOptions('package')} />
      <Tab.Screen name="Categories" component={ProductList} options={getTabScreenOptions('grid')} />
      <Tab.Screen
        name="Options"
        component={ProductList}
        options={getTabScreenOptions('more-horizontal')}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
