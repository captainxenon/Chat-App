import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase";

interface Props {
  navigation: any;
  props: any;
}

const SignUpScreen = ({ navigation, props }: Props) => {
  const [fName, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = firebase.auth().currentUser;

  const forward = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Signed in as: ", firebase.auth().currentUser);
        if (fName != "") {
          firebase
            .firestore()
            .collection("users")
            .doc(user!.uid)
            .set({
              fName: fName,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          navigation.replace("Chat", { fName: fName });
        } else {
          console.log("Please enter a Name first!");
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode + ": " + errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <View style={{ marginHorizontal: 32 }}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={(fname) => {
            setFName(fname);
          }}
          value={fName}
          autoCapitalize="words"
        />
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
  forward: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#9075e3",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUpScreen;
