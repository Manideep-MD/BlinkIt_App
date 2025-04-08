import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageStyle,
} from 'react-native';
import CustomFastImage from '../CustomFastImage/CustomFastImage';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
} from '../../redux/reducers/cartReducer';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomProductCardProps {
  item: Product;
  itemInCart?: CartItem;
}

const CustomProductCard: React.FC<CustomProductCardProps> = ({
  item,
  itemInCart,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleAddToCart = (item: Product) => {
    if (itemInCart) {
      dispatch(
        updateCartQuantity({
          id: item.id,
          quantity: itemInCart.quantity + 1,
        }),
      );
    } else {
      dispatch(
        addToCart({
          id: item.id,
          name: item.title,
          price: item.price,
          quantity: 1,
          image: item.images[0],
        }),
      );
    }
  };

  const handleDecreaseQuantity = (item: Product) => {
    if (itemInCart?.quantity > 1) {
      dispatch(
        updateCartQuantity({
          id: item.id,
          quantity: itemInCart.quantity - 1,
        }),
      );
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleNavigate = () => {
    navigation.navigate('ProductDetail', {product: item});
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={handleNavigate}>
      <CustomFastImage
        uri={item?.images[0]}
        style={{width: 120, height: 90} as ImageStyle}
      />
      <Text style={styles.productName} numberOfLines={2}>
        {item?.title}
      </Text>
      <Text style={styles.productPrice}>₹{item?.price}</Text>

      {itemInCart ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleDecreaseQuantity(item)}
            style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{itemInCart.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(CustomProductCard);

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 3,
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  quantityButton: {
    borderRadius: 6,
    width: 30,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  quantityText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
