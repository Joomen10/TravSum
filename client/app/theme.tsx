import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { router } from "expo-router";

const chips = [
  // 'foodie', 'tradition', 'fun', 'adventure', 'nature',
  // 'music', 'sports', 'culture', 'tech', 'wellness'
  'People', 'Food', 'Scenery'
];

export default function ThemeScreen() {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const submitTheme = async () => {
    if (!selectedChip) {
      console.error('No theme selected');
      return;
    }

    try {
      const response = await fetch('http://10.17.123.234:5050/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "theme": selectedChip }), // Fixed syntax
      });

      const responseData = await response.json();
      if (response.ok && responseData.videoUrl) {
        router.push({
          pathname: '/output',
          params: { videoUrl: responseData.videoUrl },
        });
      } else {
        console.error('Creation failed', responseData);
      }
    } catch (error) {
      console.error('Creation failed', error);
    }

    router.push({
      pathname: '/output',
    });
  };

  return (
    <View style = { styles.container }>
      <View style = { styles.page }>
        { chips.map((chip) => {
          const isSelected = selectedChip === chip;
          return (
            <Pressable
              key = { chip }
              onPress = { () => setSelectedChip(chip) }
              style = {{
                backgroundColor: isSelected ? '#4A90E2' : '#eee',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                borderColor: isSelected ? '#2F6EB1' : 'transparent',
              }}>
              <Text style = {{ 
                fontSize: 16, 
                color: isSelected ? 'white' : '#333', 
                fontWeight: isSelected ? 'bold' : 'normal' 
              }}>
                {chip}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <TouchableOpacity style = { [styles.button, { opacity: selectedChip ? 1 : 0.5 }] } onPress = { submitTheme } disabled={!selectedChip}>
        <Text style = { styles.buttonText }>Choose Theme</Text>
      </TouchableOpacity>
    </View>
  );
};
