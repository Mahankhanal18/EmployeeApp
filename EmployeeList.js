import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import EmployeeProfileCard from './EmployeeProfileCard';
import { getEmployees } from './api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      const employeesData = await getEmployees();
      setEmployees(employeesData);
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={employees}
        keyExtractor={(employee) => employee.id}
        renderItem={({ item }) => <EmployeeProfileCard employee={item} />}
      />
    </View>
  );
};

export default EmployeeList;
