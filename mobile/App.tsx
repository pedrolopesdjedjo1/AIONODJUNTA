import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.content}>
        <Text style={styles.title}>AIONÔDJUNTA</Text>

        <Text style={styles.subtitle}>
          Juntos somos mais fortes.
        </Text>

        <Text style={styles.status}>
          Aplicação Mobile
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 12
  },

  subtitle: {
    fontSize: 18,
    color: "#008000",
    textAlign: "center",
    marginBottom: 20
  },

  status: {
    fontSize: 16,
    color: "#333333"
  }
});
