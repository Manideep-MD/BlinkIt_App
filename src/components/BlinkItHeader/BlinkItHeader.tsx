import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {useAuth} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import {clearCart} from '../../redux/reducers/cartReducer';

const BlinkitHeader = () => {
  const cartLength = useSelector((state: RootState) => state.cart.items);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const {logout} = useAuth();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setShowLogoutModal(false);
    dispatch(clearCart());
    await logout();
  };

  const handleCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.blinkitText}>blink it in</Text>
          <Text style={styles.timeText}>16 minutes</Text>
          <Text style={styles.locationText}>Home - Maharashtra</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.cartContainer} onPress={handleCart}>
            <MaterialIcon name="cart-outline" size={27} color="#000" />
            {cartLength.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartLength.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => setShowLogoutModal(true)}>
            <Icon name="user" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowLogoutModal(false)}>
                <Text style={styles.cancelText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.logoutButton]}
                onPress={handleLogout}>
                <Text style={styles.logoutConfirmText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default BlinkitHeader;
