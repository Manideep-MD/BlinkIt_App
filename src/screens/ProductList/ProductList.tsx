import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchProducts} from '../../api/api';
import {RootState} from '../../redux/store/store';
import CartSummary from '../../components/CartSummary/CartSummary';
import BlinkitHeader from '../../components/BlinkItHeader/BlinkItHeader';
import CustomProductCard from '../../components/CustomProductCard/CustomProductCard';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import {useAuth} from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Beverages'];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState<boolean>(false);
  const cart = useSelector((state: RootState) => state.cart?.items || []);
  const navigation = useNavigation();
  const {logout} = useAuth();

  useEffect(() => {
    handleProductList();
  }, []);

  useEffect(() => {
    filterProducts(selectedCategory);
  }, [selectedCategory, products]);

  const handleProductList = async () => {
    setLoading(true);
    try {
      const response = await fetchProducts();
      if (response) {
        setProducts(response?.data?.products || []);
      } else {
        console.log('error while fetching data');
      }
    } catch (error) {
      console.log(error, 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = (category: string) => {
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        item => item?.category?.toLowerCase() === category.toLowerCase(),
      );
      setFilteredProducts(filtered);
    }
  };

  const renderProducts = ({item}: any) => {
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);

    return <CustomProductCard item={item} itemInCart={itemInCart} />;
  };

  return (
    <>
      <View style={styles.container}>
        <BlinkitHeader onLogout={logout} />
        <View>
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={renderProducts}
          contentContainerStyle={{paddingBottom: 100}}
        />
        {cart.length > 0 && <CartSummary cart={cart} navigation={navigation} />}
      </View>
      {loading && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: 0, backgroundColor: '#fff'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  tabContainer: {
    paddingVertical: 7,
    paddingHorizontal: 5,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: 10,
  },
  activeTabItem: {
    borderBottomColor: 'lightyellow',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    // margin: 10,
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
  addToCartText: {color: '#fff', fontWeight: 'bold'},
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {color: '#000', fontWeight: 'bold', fontSize: 16},
});

export default ProductList;
