import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 60,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 20,
      marginBottom: 10,
    },
    
    // BUTTON
    button: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width : "100%",
    },
    uploadButton: {
      marginTop: 20,
      backgroundColor: '#4CAF50',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    imageContainer: {
      maxHeight: 400,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
      resizeMode: 'cover',
    },

    //VIDEO
    video: {
      width: "100%",
      height: 200,
    },
  });