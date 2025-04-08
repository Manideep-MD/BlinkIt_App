import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from '../../redux/reducers/cartReducer';
import CustomFastImage from '../../components/CustomFastImage/CustomFastImage';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

interface ProductDetailsProps {
  route: any;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({route}) => {
  const product = route?.params?.product;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const cartItems = useSelector((state: any) => state.cart.items);
  const cartItem = cartItems.find((item: any) => item.id === product?.id);

  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity}));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1000);
  };

  const handleIncreaseQuantity = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    dispatch(updateCartQuantity({id: product.id, quantity: newQty}));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(updateCartQuantity({id: product.id, quantity: newQty}));
    } else {
      handleRemoveFromCart();
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    setQuantity(1);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Product Details"
        onBackPress={() => navigation.goBack()}
      />

      <CustomFastImage uri={product?.images[0]} style={styles.image} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.price}>₹{product?.price}</Text>
        <Text style={styles.description}>{product?.description}</Text>

        {cartItem ? (
          <>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecreaseQuantity}>
                <MaterialCommunityIcons
                  name="minus-circle"
                  size={24}
                  color="#ff9800"
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncreaseQuantity}>
                <MaterialCommunityIcons
                  name="plus-circle"
                  size={24}
                  color="#4caf50"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveFromCart}>
              <MaterialCommunityIcons
                name="cart-remove"
                size={24}
                color="#fff"
              />
              <Text style={styles.buttonText}>Remove from Cart</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}>
            <MaterialCommunityIcons name="cart-plus" size={24} color="#fff" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}

        {addedToCart && (
          <LottieView
            source={require('../../assets/animatedIcons/success.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  backButton: {position: 'absolute', top: 15, left: 10, zIndex: 10},
  image: {width: '100%', height: 250, resizeMode: 'contain', marginTop: 40},
  detailsContainer: {padding: 16, alignItems: 'center'},
  title: {fontSize: 20, fontWeight: 'bold', color: '#000'},
  price: {
    fontSize: 18,
    color: '#ff5722',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {padding: 8},
  quantityText: {fontSize: 18, fontWeight: 'bold', marginHorizontal: 10},
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#ff9800',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 15,
    width: '80%',
  },
  removeButton: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 15,
    width: '80%',
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8},
  lottie: {width: 100, height: 100, alignSelf: 'center', marginTop: 10},
});

export default ProductDetails;
