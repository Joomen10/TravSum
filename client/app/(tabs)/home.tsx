import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export default function Home() {
  return (
    <View style = { styles.container }>
      <View style = { styles.page }>
        <Text>Home Page Area</Text>
      </View>
      <TouchableOpacity style = { styles.button }>
          <Text style = { styles.buttonText }>Save</Text>
      </TouchableOpacity>
    </View>
  );
}