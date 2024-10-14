import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const DateListApp = () => {
  const [dates, setDates] = useState([
    "2024-04-15",
    "2023-12-01",
    "2023-07-10",
    "2023-03-25",
    "2024-01-10",
    "2023-08-19",
    "2024-02-14",
  ]);

  // Function to sort dates by month and day (ignoring the year)
  const sortDates = (dateArray) => {
    return dateArray.sort((a, b) => {
      const [yearA, monthA, dayA] = a.split("-").map(Number);
      const [yearB, monthB, dayB] = b.split("-").map(Number);

      // Compare month first, then day
      if (monthA === monthB) {
        return dayA - dayB;
      }
      return monthA - monthB;
    });
  };

  useEffect(() => {
    // Sort dates when component mounts
    const sortedDates = sortDates(dates);
    setDates(sortedDates);
  }, []);

  // Function to generate a random date within the last 10 years
  const getRandomDate = () => {
    const start = new Date();
    start.setFullYear(start.getFullYear() - 10); // Go back 10 years
    const end = new Date();

    // Get a random date between start and end
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );

    // Format date to "YYYY-MM-DD"
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(randomDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Add a random date to the list and re-sort
  const addRandomDate = () => {
    const newDate = getRandomDate();
    const updatedDates = [...dates, newDate];
    const sortedDates = sortDates(updatedDates);
    setDates(sortedDates); // Update state with the sorted array
  };

  // Render each date item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.dateText}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab} onPress={addRandomDate}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 4,
    height: 60,
    backgroundColor: "pink",
    borderBottomColor: "white",
  },
  dateText: {
    fontSize: 18,
    color: "white",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 0,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // For Android shadow
  },
  fabText: {
    color: "white",
    fontSize: 30,
  },
});

export default DateListApp;
