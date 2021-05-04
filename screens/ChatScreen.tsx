import firebase from "firebase";
import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import Fire from "../Fire";

interface Props {
  navigation: any;
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}

const ChatScreen = ({ navigation }: Props) => {
  const [messages, setMessages] = useState([]);

  const name = navigation.getParam("name");
  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: `Hello ${name}`,
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: "React Native",
    //       avatar: "https://placeimg.com/140/140/any",
    //     },
    //   },
    // ]);
    const unsubscribe = firebase
      .firestore()
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          }))
        )
      );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    firebase.firestore().collection("chats").add({
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const chatBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: "pink", minWidth: 100 },
        }}
      ></Bubble>
    );
  };

  const chat = (
    <GiftedChat
      // minComposerHeight={30}
      renderBubble={chatBubble}
      alwaysShowSend
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
