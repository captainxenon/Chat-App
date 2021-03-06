import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import firebase from "firebase";

interface Props {
  navigation: any;
  props: any;
}

const LoginScreen = ({ navigation, props }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = firebase.auth().currentUser;

  const forward = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Signed in as: ", firebase.auth().currentUser);
        if (email != "" && password != "") {
          navigation.replace("Chat");
        } else if (email == "") {
          console.log("Please enter an Email ID...");
        } else if (password == "") {
          console.log("Please enter a valid Password...");
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  const SignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Chat App</Text>
        <TextInput
          style={styles.input}
          placeholder="Email ID"
          onChangeText={(email) => {
            setEmail(email);
          }}
          value={email}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(password) => {
            setPassword(password);
          }}
          value={password}
        />
        <View style={{ alignItems: "center", marginTop: 64, zIndex: 1 }}>
          <TouchableOpacity style={styles.button} onPress={forward}>
            <Text style={styles.textStyle}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={SignUp}>
            <Text style={styles.textStyle}>Sign Up</Text>
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
    marginTop: 50,
    marginBottom: 30,
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
  button: {
    width: 120,
    height: 50,
    backgroundColor: "#9075e3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  textStyle: {
    fontSize: 18,
    letterSpacing: 1,
    color: "#fff",
  },
});

export default LoginScreen;
