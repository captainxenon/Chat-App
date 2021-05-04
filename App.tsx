import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Navigator from "./Navigator";

import firebase from "firebase";

export default App = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyD7tv4RnE0aXyVQ6zJbuFyqQPhdgjZ44Fo",
        authDomain: "chat-app-142c8.firebaseapp.com",
        projectId: "chat-app-142c8",
        storageBucket: "chat-app-142c8.appspot.com",
        messagingSenderId: "509041123476",
        appId: "1:509041123476:web:dce377daea164a90e45481",
        measurementId: "G-G3LLZXL4X5",
      });
    }
  }, []);
  return <Navigator></Navigator>;
};
