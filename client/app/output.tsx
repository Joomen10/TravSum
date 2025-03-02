import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import Loading from './loading'; // Import the Loading component
import { styles } from './styles';
import { router } from 'expo-router';

export default function VideoScreen() {
  const [data, setData] = useState<string | null>(null);

  const navigate = () => {
    router.push({
      pathname: '/',
    });
    };

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData('https://www.w3schools.com/html/mov_bbb.mp4'); // Mock video URL
    }, 2000); // Simulate a delay of 2 seconds
  }, []);

  return (
    <View style = { styles.container }>
      { data ? (
        <Video
          source={{ uri: data }}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
      ) : (
        <Loading />
      )}

        <TouchableOpacity style = { [styles.button, styles.uploadButton] } onPress = { navigate }>
            <Text style = { styles.buttonText }>Upload Selected Images</Text>
          </TouchableOpacity>
    </View>
  );
}