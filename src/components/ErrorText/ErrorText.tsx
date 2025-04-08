import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ErrorIcon from 'react-native-vector-icons/MaterialIcons';

interface ErrorProps {
  text: string;
}

const ErrorText: React.FC<ErrorProps> = ({text}) => {
  const styles = createStyles();
  return (
    <View style={styles.textContainer}>
      <ErrorIcon name="error-outline" size={16} color={'red'} />
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};

export default ErrorText;

export const createStyles = () =>
  StyleSheet.create({
    textContainer: {flexDirection: 'row', alignItems: 'center', gap: 5},
    errorText: {
      color: 'red',
      fontSize: 12,
    },
  });
