import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const CustomBottomSheet = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    expand: () => setVisible(true),
    close: () => setVisible(false),
  }));

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
          {props.children}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  closeText: { textAlign: 'center', fontSize: 18, color: 'red', marginBottom: 10 },
});

export default CustomBottomSheet;
