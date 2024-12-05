import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,Button ,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutPage({ navigation}) {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); 

  useEffect(() => {
    const loremPicsumImage = 'https://fastly.picsum.photos/id/838/5000/3333.jpg?hmac=QLioLwW7LgW7mt2ADC8syet_zrW2Maaa9QV_XNVxP_Q'; 
    setProfileImage(loremPicsumImage);
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              navigation.replace('Login');
            } catch (error) { 
              console.error('Error clearing AsyncStorage during logout:', error);
              Alert.alert('Error', 'Failed to log out. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={['#B381DA', '#70A9FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <LinearGradient
        colors={['#4649A0', '#40AEA0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}  
      >
        <Text style={styles.headerText}>Checkout</Text>
      </LinearGradient>
      <View style={styles.itemList}>
        <Image
          source={{
            uri: profileImage,
          }}
          style={styles.profilePic}
        />
        <Button title="Logout" onPress={handleLogout}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: {
    padding: 15,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemList: {
    padding: 15,
    margin: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 40,
  },
});
