import React from 'react';
import FastImage from 'react-native-fast-image';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ViewStyle,
  ImageStyle,
} from 'react-native';

interface CustomFastImageProps {
  uri: string;
  style?: ViewStyle & ImageStyle;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
}

const CustomFastImage: React.FC<CustomFastImageProps> = ({
  uri,
  style,
  resizeMode = 'contain',
}) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={[styles.container, style]}>
      {loading && (
        <ActivityIndicator size="small" color="#888" style={styles.loader} />
      )}
      <FastImage
        source={{uri}}
        style={[styles.image, style]}
        resizeMode={resizeMode as any}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
  },
  loader: {
    position: 'absolute',
  },
});

export default CustomFastImage;
