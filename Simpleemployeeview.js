import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import EmployeeProfileCard from './EmployeeProfileCard';
import { getEmployees } from './api';

const SingleEmployeeView = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [subordinates, setSubordinates] = useState([]);

  useEffect(() => {
    (async () => {
      const employeesData = await getEmployees();
      const employeeData = employeesData.find((e) => e.id === employeeId);
      setEmployee(employeeData);
      const subordinatesData = employeesData.filter((e) => e.manager === employeeData.name);
      setSubordinates(subordinatesData);
    })();
  }, [employeeId]);

  if (!employee) {
    return <Text>No employee found with ID: {employeeId}</Text>;
  }

  return (
    <ScrollView>
      <EmployeeProfileCard employee={employee} />

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Subordinates:</Text>
      <FlatList
        data={subordinates}
        keyExtractor={(employee) => employee.id}
        renderItem={({ item }) => <EmployeeProfileCard employee={item} />}
      />
    </ScrollView>
  );
};

export default SingleEmployeeView;
