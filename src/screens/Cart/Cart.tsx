import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart, addToCart} from '../../redux/reducers/cartReducer';
import {RootState} from '../../redux/store/store';
import CustomFastImage from '../../components/CustomFastImage/CustomFastImage';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import CartItemCard from '../../components/CartItemCard/CartItemCard';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Props {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any>;
}

const CartScreen: React.FC<Props> = ({navigation}) => {
  const cart = useSelector(
    (state: RootState) => state.cart.items,
  ) as CartItem[];
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(addToCart({...item, quantity: 1}));
  };

  const handleDecreaseQuantity = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const renderCartItem = useCallback(
    ({item}: {item: CartItem}) => (
      <CartItemCard
        item={item}
        onIncrease={handleIncreaseQuantity}
        onDecrease={handleDecreaseQuantity}
      />
    ),
    [handleIncreaseQuantity, handleDecreaseQuantity],
  );

  return (
    <View style={styles.container}>
      <CustomHeader title="Your Cart" onBackPress={() => navigation.goBack()} />

      {cart?.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCartItem}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ₹{totalPrice}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout')}>
              <Text style={styles.checkoutText}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.emptyText}>🛒 Your cart is empty!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    backgroundColor: '#ffcc00',
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 12,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {width: 60, height: 60, borderRadius: 8, marginRight: 12},
  itemDetails: {flex: 1},
  itemName: {fontSize: 16, fontWeight: 'bold', color: '#333'},
  itemPrice: {fontSize: 14, color: 'green', fontWeight: '600', marginTop: 4},
  quantityContainer: {flexDirection: 'row', alignItems: 'center'},
  quantityButton: {
    backgroundColor: '#28a745',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {fontSize: 18, fontWeight: 'bold', color: '#000'},
  checkoutButton: {
    backgroundColor: '#ff9f00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#777',
  },
});

export default CartScreen;
