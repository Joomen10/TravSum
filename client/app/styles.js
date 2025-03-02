import { StyleSheet } from 'react-native';

const VAR = {
  white16 : "rgba(255, 255, 255, 0.16)",
  white40 : "rgba(255, 255, 255, 0.4)",

  radius : 8,
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: 20,
      paddingTop: 60,
      backgroundColor : "#000",
      color : '#fff'
    },

    //PAGE
    page : {
      flex : 1,
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

    //TOP BAR
    topBar : {
      width : "100%",
      height : 56,

      fontSize : 20,

      color : "#fff",
      // backgroundColor : VAR.white16,
    },
    
    // BUTTON
    button: {
      width : "100%",
      height : "56px",

      backgroundColor: '#2196F3',
      padding: 15,

      borderRadius: VAR.radius,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },

    // IMAGE UPLOAD BUTTON
    imageButton : {
      width : "100%",
      flex : 1,

      backgroundColor: VAR.white16,
      
      borderRadius: VAR.radius,
      alignItems: 'center',
      justifyContent : "center",
    },

    uploadButton: {
      marginTop: 20,
      backgroundColor: '#4CAF50',
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