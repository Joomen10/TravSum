import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen : {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
