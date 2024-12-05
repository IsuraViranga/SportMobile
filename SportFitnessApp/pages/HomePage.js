import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import FloatingButton from '../components/FloatingButton';
import { ClickContext } from '../context/ClickContext';

export default function HomePage({ username }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { setClickCount } = useContext(ClickContext);

  useEffect(() => {
    axios
      .get('https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=England') 
      .then((response) => {
        if (response.data.countries && Array.isArray(response.data.countries)) {
          const sportsData = response.data.countries.slice(0, 11).map((sport) => ({
            id: sport.idLeague,
            title: sport.strSport,
            description: sport.strLeague,
            image: sport.strFanart2,
            status: sport.strGender,
          }));
          setItems(sportsData);
        } else {
          console.error('No sports data available');
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);  

  const handleItemClick = () => {
    setClickCount((prev) => prev + 1);
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
        <Text style={styles.headerText}>Welcome {username} !</Text>
      </LinearGradient>
      <View style={styles.itemList}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ItemCard
                title={item.title}
                description={item.description}
                image={item.image}
                status={item.status}
                onPress={handleItemClick}
              />
            )}
          />
        )}
      </View>
      <FloatingButton />
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
    backgroundColor: '#fff',
    margin: 25,
    marginBottom:0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
