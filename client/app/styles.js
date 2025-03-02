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
      color : '#fff',

      border: {
        borderWidth: 1,
        borderColor: 'red',
      },
      
    },

    //PAGE
    page : {
      flex : 1,
      gap : 8,
      alignItems : "center",
      justifyContent : "center",
    },

    //TEXT
    p : {
      fontSize : 12,
      color : "#fff",
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
      height : 56,

      fontSize : 20,

      color : "#fff",
      // backgroundColor : VAR.white16,
    },
    
    // BUTTON
    button: {
      width : "100%",
      height : 56,

      backgroundColor: '#2196F3',
      padding: 15,

      borderRadius: VAR.radius,
      alignItems: 'center',
      justifyContent : 'center',

      marginTop : 20,
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
    
// In your styles.js file
imageContainer: {
  height: 150,
  width: '100%',
  marginVertical: 10,
},
image: {
  width: 120,
  height: 120,
  margin: 5,
  borderRadius: 8,
},

    //VIDEO
    video: {
      width: "100%",
      height: 200,

      alignItems : "center",
      justifyContent : "center",

      borderRadius : 8,

      margin : 0,
    },

    videoClip : {
      width : 300,
      height : "100%",

      alignItems : "center",
      justifyContent : "center",
    }
  });