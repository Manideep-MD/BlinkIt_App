import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CustomFastImage from '../CustomFastImage/CustomFastImage';

interface Props {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onIncrease: (item: any) => void;
  onDecrease: (id: number) => void;
}

const CartItemCard: React.FC<Props> = ({item, onIncrease, onDecrease}) => {
  return (
    <View style={styles.card}>
      <CustomFastImage uri={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
      <View style={styles.quantity}>
        <TouchableOpacity
          onPress={() => onDecrease(item.id)}
          style={styles.btn}>
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => onIncrease(item)} style={styles.btn}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(CartItemCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    padding: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: 'green',
    fontWeight: '600',
    marginTop: 4,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    // backgroundColor: '#28a745',
    // paddingHorizontal: 10,
    // paddingVertical: 4,
    borderRadius: 6,
    width: 30,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  btnText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyText: {
    marginHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
