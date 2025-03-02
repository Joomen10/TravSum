import React, { useState } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { router } from "expo-router";

const chips = [
  'foodie', 'tradition', 'fun', 'adventure', 'nature',
  'music', 'sports', 'culture', 'tech', 'wellness'
];

const navigate = () => {
    router.push({
      pathname: '/output',
    });
};

export default function ThemeScreen() {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, padding: 16 }}>
      {chips.map((chip) => {
        const isSelected = selectedChip === chip;
        return (
          <Pressable
            key={chip}
            onPress={() => setSelectedChip(chip)}
            style={{
              backgroundColor: isSelected ? '#4A90E2' : '#eee',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 20,
              borderWidth: isSelected ? 2 : 0,
              borderColor: isSelected ? '#2F6EB1' : 'transparent',
            }}>
            <Text style={{ 
              fontSize: 16, 
              color: isSelected ? 'white' : '#333', 
              fontWeight: isSelected ? 'bold' : 'normal' 
            }}>
              {chip}
            </Text>
          </Pressable>
        );
      })}

      <TouchableOpacity style = { styles.button } onPress = { navigate }>
        <Text style = { styles.buttonText }>Choose Theme</Text>
      </TouchableOpacity>
    </View>
  );
};
