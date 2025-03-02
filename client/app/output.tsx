import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { styles } from './styles';
import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

export default function VideoScreen() {
  const [data, setData] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [error, setError] = useState(null);
  const { videoUrl } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  const navigate = () => {
    router.push('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setData('https://www.w3schools.com/html/mov_bbb.mp4');
      // setData('./assets/video.mp4');
      // setData('https://www.canva.com/design/DAGgl1BuO30/JI7_nwAFUizBoQFrJs-ePg/watch?utm_content=DAGgl1BuO30&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h6ea6aa9984');
      // setData('https://drive.google.com/file/d/1UJ1weNSuj3Ezj0zYzNiQSw_zANViTOqc/view');
    }, 2000); //2000
  }, []);

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(pulseAnimation).start();

    return () => {
      fadeAnim.stopAnimation(); //clean up
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.page}>
        {!data && (
          <Animated.View 
            style = {[
              styles.video, 
              { 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                borderRadius : 8,
                opacity: fadeAnim,
                justifyContent: 'center',
                alignItems: 'center',
              }
            ]}
          >
            <Text style = { styles.buttonText }>Loading Video...</Text>
          </Animated.View>
        )}

        {/* console.log(data); */}

        {data && (
          <View style={ styles.video }>
            <Video
              source={{ uri: data }}
              style = { styles.videoClip }
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
              onReadyForDisplay={() => setVideoReady(true)}
              onError={(error) => {
                console.error("Video error:", error);
                setError(error);
              }}
            />
            
            {!videoReady && !error && (
              <Animated.View 
                style={[
                  { 
                    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                    borderRadius : 8,
                    opacity: fadeAnim,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                ]}
              >
                <Text style = { styles.buttonText }>Generating Clip..</Text>
              </Animated.View>
            )}
          </View>
        )}
        
        {error && (
          <View style = { [styles.video, { backgroundColor: '#FFEEEE', justifyContent: 'center', alignItems: 'center' }] }>
            <Text style = {{ color: 'red' }}>
              Error loading video. Please check the URL and try again.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.button, { opacity: data ? 1 : 0.5 }]} 
        onPress={navigate} 
        disabled={!data}
      >
        <Text style={styles.buttonText}>{data ? "Save" : "Loading..."}</Text>
      </TouchableOpacity>
    </View>
  );
}