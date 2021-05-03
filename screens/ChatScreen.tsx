import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const chat = (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );

  return <SafeAreaView style={styles.ViewStyle}>{chat}</SafeAreaView>;
};

const styles = StyleSheet.create({
  ViewStyle: {
    flex: 1,
  },
});

export default ChatScreen;
