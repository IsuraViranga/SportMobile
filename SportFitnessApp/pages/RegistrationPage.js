import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function RegistrationPage({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://192.168.1.14:5000/api/auth/register', {
        username: data.username,  
        password: data.password,
      });
      if (response.status === 201) {
        Alert.alert('Success', response.data.message);
        navigation.navigate('Login');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <LinearGradient
    colors={['#4649A0', '#40AEA0']} 
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.container} 
    >
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            secureTextEntry
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 0, padding: 10, marginVertical: 5, borderRadius: 5,backgroundColor:'white' },
  error: { color: 'red', marginBottom: 10 },
  linkContainer: {
    paddingRight:10,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  link: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});
