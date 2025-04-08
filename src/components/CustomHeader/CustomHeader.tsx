// components/CustomHeader.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  onBackPress: () => void;
}

const CustomHeader: React.FC<Props> = ({title, onBackPress}) => {
  return (
    <>
      <StatusBar backgroundColor="#ffcc00" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBackPress} style={styles.iconWrapper}>
          <Icon name="chevron-back" size={26} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightSpace} />
      </View>
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#ffcc00',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconWrapper: {
    width: 26,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rightSpace: {
    width: 26,
  },
});
