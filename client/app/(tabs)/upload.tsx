import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { styles } from '../styles';

export default function UploadScreen() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [buttonState, setButtonState] = useState(0);

  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    
    if (!result.canceled) {
      setSelectedImages(result.assets);
    }
  };

  const uploadImages = async () => {
    const formData = new FormData();

    selectedImages.forEach((image, index) => {
      formData.append('files', {
        uri: image.uri,
        type: 'image/jpeg', // Adjust the MIME type accordingly
        name: `image-${index}.jpg`, // Name the file
      });
    });

    console.log(formData);

    try {
      const response = await fetch('http://10.17.123.234:5050/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('Upload successful', responseData);
      } else {
        console.error('Upload failed', responseData);
      }
    } catch (error) {
      console.error('Upload failed', error);
    }

    router.push({
      pathname: '/theme',
      // params: {
      //   images: JSON.stringify(selectedImages.map(img => img.uri))
      // }
    });
  };

  const navigate = () => {
    router.push({
      pathname: '/theme',
      params: {
        images: JSON.stringify(selectedImages.map(img => img.uri))
      }
    });
  };

  return (
    <View style = { styles.container }>
      <Text style = { styles.topBar }>Osaka Travel</Text>
      
      <View style={styles.page}>
        <TouchableOpacity style={styles.imageButton} onPress={openImagePicker}>
          <Text style={styles.buttonText}>Select Images from Gallery</Text>
        </TouchableOpacity>
        
        {selectedImages.length > 0 && (
          <>
            <Text style = { styles.subtitle }>Selected Images ({selectedImages.length})</Text>

            <ScrollView style = { styles.imageContainer }>
              { selectedImages.map((image, index) => (
                <Image 
                  key = { index }
                  source = { { uri: image.uri } }
                  style = { styles.image }
                />
              ))}
            </ScrollView>
          </>
        )}
      </View>
          
      <TouchableOpacity style = { [styles.button, { opacity: selectedImages.length > 0 ? 1 : 0.5 } ]} onPress = { uploadImages } disabled = { selectedImages.length === 0 }>
        <Text style = { styles.buttonText }>Upload Images</Text>
      </TouchableOpacity>
    </View>
  );
}
