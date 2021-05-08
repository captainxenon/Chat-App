import firebase from "firebase";
import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { Feather } from "@expo/vector-icons";

interface Props {
  navigation: any;
  _id: string | number;
  text: string;
  createdAt: Date | number;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

const ChatScreen = ({ navigation }: Props) => {
  const [messages, setMessages] = useState<any>([]);
  const user = firebase.auth().currentUser;

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.replace("Login");
        alert("Signed out successfully!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Feather
            name="log-out"
            size={20}
            style={{ marginRight: 20 }}
            onPress={signOut}
          />
        );
      },
    });
  }, []);

  useEffect(() => {
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
    setMessages((previousMessages: any) =>
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

  const chatBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { minWidth: 100 },
          left: { backgroundColor: "lightgreen", minWidth: 100 },
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
        _id: user?.email,
        name: user?.displayName,
        avatar: "https://placeimg.com/140/140/any",
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
