import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  const forward = () => {
    navigation.navigate("Chat", { name: name });
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="JohnDoe"
          onChangeText={(name) => {
            setName(name);
          }}
          value={name}
        />
        <View style={{ alignItems: "flex-end", marginTop: 64 }}>
          <TouchableOpacity style={styles.forward} onPress={forward}>
            <Feather name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: "#fff",
    position: "absolute",
    left: -120,
    top: -20,
  },
  header: {
    fontWeight: "800",
    fontSize: 30,
    color: "#514e5a",
    marginTop: 200,
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: 0.5,
    borderColor: "#bab7c3",
    paddingHorizontal: 16,
    color: "#514e5a",
    fontWeight: "600",
  },
  forward: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#9075e3",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
