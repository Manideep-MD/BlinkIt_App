import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

interface Props {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categoryIconMap: {[key: string]: string} = {
  All: 'apps',
  Grocery: 'cart-outline',
  Fruits: 'fruit-cherries',
  Vegetables: 'food-apple',
  Snacks: 'cookie-outline',
  Drinks: 'cup-water',
};

const CategoryTabs: React.FC<Props> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContainer}>
      {categories?.map(cat => (
        <TouchableOpacity
          key={cat}
          onPress={() => onCategorySelect(cat)}
          style={[
            styles.tabItem,
            selectedCategory === cat && styles.activeTabItem,
          ]}>
          <View style={styles.emptyCart}>
            {categoryIconMap[cat] && (
              <MaterialCommunityIcons
                name={categoryIconMap[cat]}
                size={18}
                color={selectedCategory === cat ? '#FFD700' : '#999'}
                style={{marginRight: 5}}
              />
            )}
            <Text
              style={[
                styles.tabText,
                selectedCategory === cat && styles.activeTabText,
              ]}>
              {cat}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryTabs;
