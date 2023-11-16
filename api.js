import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const apiUrl = 'https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(apiUrl);
      const data = response.data;
      setEmployees(data);
    };

    fetchData();
  }, []);

  const renderEmployeeCard = ({ item }) => {
    const { name, email, phone, manager } = item;
    const backgroundColor = item.backgroundColor || '#ffffff';

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor }]}
        onPress={() => {
          setCurrentEmployee(item);
          setViewMode('single');
        }}
      >
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardText}>{email}</Text>
        <Text style={styles.cardText}>{phone}</Text>
        <Text style={styles.cardText}>Manager: {manager.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderSingleEmployeeView = () => {
    const { name, email, phone, manager } = currentEmployee;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Employee Profile</Text>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <Text style={styles.text}>Phone: {phone}</Text>
        <Text style={styles.text}>Manager: {manager.name}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setViewMode('list')}
        >
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {viewMode === 'list' ? (
        <FlatList
          data={employees}
          renderItem={renderEmployeeCard}
          keyExtractor={(item) => item.id}
        />
      ) : (
        renderSingleEmployeeView()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
