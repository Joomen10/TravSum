import { View, Text, StyleSheet, Platform } from 'react-native';
import { styles } from './styles';

export default function Loading() {
  return (
    <View style = { styles.container }>
      <Text style = { { color : "white" } }>Loading..</Text>
    </View>
  );
}