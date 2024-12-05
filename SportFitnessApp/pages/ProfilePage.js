import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ProfilePage({ username, password }) {
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150'); 
  const [passwordVisible, setPasswordVisible] = useState(false); 

  useEffect(() => {
    const loremPicsumImage = 'https://fastly.picsum.photos/id/838/5000/3333.jpg?hmac=QLioLwW7LgW7mt2ADC8syet_zrW2Maaa9QV_XNVxP_Q'; // Replace 1040 with your preferred image ID
    setProfileImage(loremPicsumImage);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
        <Text style={styles.headerText}>Profile</Text>
      </LinearGradient>
      <View style={styles.itemList}>
        <Image
          source={{
            uri: profileImage,
          }}
          style={styles.profilePic}
        />
        <Text style={styles.name}>Username: {username}</Text>
        
        <View style={styles.passwordContainer}>
          <Text style={styles.password}>
            {passwordVisible ? password : '******'}
          </Text>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="gray"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    gap:40,
  },
  password: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});
