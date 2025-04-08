import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {clearCart, removeFromCart} from '../../redux/reducers/cartReducer';
import RemoveIcon from 'react-native-vector-icons/AntDesign';
import {AZORPAY_KEY_ID} from '@env';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

const CheckoutScreen = ({navigation}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 500 ? 0 : 40;
  const totalAmount = subtotal + deliveryFee;

  const handlePayment = () => {
    const options = {
      description: 'Blinkit Order Payment',
      currency: 'INR',
      key: AZORPAY_KEY_ID,
      amount: totalAmount * 100,
      name: 'Blinkit',
      prefill: {
        email: 'splendornett@gmail.com',
        contact: '7665571237',
        name: 'Manideep',
      },
      theme: {color: '#28a745'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        Alert.alert(
          'Payment Successful',
          `Payment ID: ${data.razorpay_payment_id}`,
          [{text: 'Go to Home', onPress: () => navigation.navigate('Main')}],
        );
        dispatch(clearCart());
      })
      .catch((error: any) => {
        Alert.alert(
          'Payment Failed',
          `Reason: ${error.description || 'Unknown error'}`,
        );
      });
  };

  const renderItem = ({item}) => (
    <View style={styles.itemCard}>
      <View style={styles.itemTopRow}>
        <Text style={styles.itemTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
          <RemoveIcon name="closecircle" size={20} color={'red'} />
        </TouchableOpacity>
      </View>
      <View style={styles.itemBottomRow}>
        <Text style={styles.itemText}>Quantity : {item.quantity}</Text>
        <Text style={styles.itemText}>₹{item.price * item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View>
        <CustomHeader
          title="Check out"
          onBackPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Subtotal: ₹{subtotal.toFixed(2)}
          </Text>
          <Text style={styles.summaryText}>Delivery Fee: ₹{deliveryFee}</Text>
          <Text style={styles.totalAmount}>
            Total: ₹{totalAmount.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={handlePayment}>
          <Text style={styles.orderButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffcc00',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  itemCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  removeText: {
    color: 'red',
    fontSize: 20,
    paddingLeft: 10,
  },
  summary: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 10,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  orderButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
