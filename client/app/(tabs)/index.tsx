import { View, Text, StyleSheet, Platform } from 'react-native';

export default function Profile() {
  return (
    <View>
      <Text>Profile</Text>
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
