// index.tsx (Upload page)
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { styles } from '../styles';

export default function UploadScreen() {
  const [selectedImages, setSelectedImages] = useState([]);

  const openImagePicker = async () => {
    // Request permissions
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    
    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      setSelectedImages(result.assets);
    }
  };

  const navigateToThemePage = () => {
    // Navigate to the theme page with selected images data
    router.push({
      pathname: '/theme',
      params: {
        images: JSON.stringify(selectedImages.map(img => img.uri))
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Photos</Text>
      
      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Select Images from Gallery</Text>
      </TouchableOpacity>
      
      {selectedImages.length > 0 && (
        <>
          <Text style={styles.subtitle}>Selected Images ({selectedImages.length})</Text>
          <ScrollView style={styles.imageContainer}>
            {selectedImages.map((image, index) => (
              <Image 
                key={index}
                source={{ uri: image.uri }}
                style={styles.image}
              />
            ))}
          </ScrollView>
          
          <TouchableOpacity 
            style={[styles.button, styles.uploadButton]}
            onPress={navigateToThemePage}
          >
            <Text style={styles.buttonText}>Upload Selected Images</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}