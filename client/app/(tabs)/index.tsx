import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet } from 'react-native';
import { styles } from '../styles';

export default function Profile() {
  // State to store screen dimensions
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  
  // Array of image URLs
  const imageUrls = [
    'https://picsum.photos/300/300?random=1',
    'https://picsum.photos/300/300?random=2',
    'https://picsum.photos/300/300?random=3',
    'https://picsum.photos/300/300?random=4',
    'https://picsum.photos/300/300?random=5',
    'https://picsum.photos/300/300?random=6',
    'https://picsum.photos/300/300?random=7',
    'https://picsum.photos/300/300?random=8',
    'https://picsum.photos/300/300?random=9'
  ];
  
  // Update dimensions when orientation changes
  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
    };
    
    const dimensionsHandler = Dimensions.addEventListener('change', updateLayout);
    
    return () => {
      dimensionsHandler.remove();
    };
  }, []);
  
  // Render each grid item
  const renderGridItem = ({ item }) => (
    <View style={localStyles.imageContainer}>
      <View style={localStyles.imageWrapper}>
        <Image
          source={{ uri: item }}
          style={localStyles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
            <View style={{ display: "flex" }}>
              <Text style={styles.p}>🇺🇸 🇰🇷 🇳🇱 🇧🇷</Text>
              <Text style={styles.topBar}>Chris Park</Text>
            </View>

      <Text style={localStyles.heading}>Profile Grid</Text>
      
      <FlatList
        data={imageUrls}
        renderItem={renderGridItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        key={`grid-${screenWidth}`}
        contentContainerStyle={localStyles.gridContainer}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  heading: {
    marginBottom: 15, 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  gridContainer: {
    width: '100%',
  },
  imageContainer: {
    width: '33.33%', // Exactly one-third of the container width
    padding: 2,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1, // Forces a 1:1 aspect ratio (square)
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  }
});