import {RootState} from '@reduxjs/toolkit/query';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const CartSummary = ({cart, navigation}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (cart.length > 0) {
      setIsVisible(true);
    }
  }, [cart]);

  if (!isVisible || cart.length === 0) return null;

  const cartLength = useSelector((state: RootState) => state.cart.items.length);
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Items: {cartLength} | Total: ₹{totalPrice}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleCart}>
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsVisible(false)}
        style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
  },
  closeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartSummary;
