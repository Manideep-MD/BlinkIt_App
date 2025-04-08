import React from 'react';
import {View, Text, Modal, ActivityIndicator, StyleSheet} from 'react-native';
import createStyle from './Loader.style';

const Loader = () => {
  const styles = createStyle();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={true}
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="gold" />
          <Text style={styles.text}>Please Wait</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
