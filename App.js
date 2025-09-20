import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Switch,
} from "react-native";

const App = () => {
  const [isChatMode, setIsChatMode] = useState(true);

  const [messages, setMessages] = useState([
    { id: "1", user: "kaiser", text: "Bro, you there?" },
    { id: "2", user: "Jay sumatra", text: "Yup, what's up?" },
  ]);

  const [comments, setComments] = useState([
    { id: "1", user: "jay-r", text: "you are the best mylove!" },
    { id: "2", user: "kaiser", text: "aray ko..." },
  ]);

  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newItem = {
      id: Date.now().toString(),
      user: "Jay sumatra",
      text: inputText.trim(),
    };

    if (isChatMode) {
      setMessages([newItem, ...messages]);
    } else {
      setComments([newItem, ...comments]);
    }

    setInputText("");
    Keyboard.dismiss();
  };

  const renderItem = ({ item }) => {
    const isCurrentUser = item.user === "Jay sumatra";

    if (isChatMode) {
      return (
        <View
          style={[
            styles.messageContainer,
            isCurrentUser ? styles.rightAlign : styles.leftAlign,
          ]}
        >
          <View
            style={[
              styles.bubble,
              isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
            ]}
          >
            <Text style={styles.username}>{item.user}</Text>
            <Text
              style={[
                styles.text,
                isCurrentUser ? styles.currentUserText : styles.otherUserText,
              ]}
            >
              {item.text}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.commentBox}>
          <Text style={styles.username}>{item.user}</Text>
          <Text style={styles.comment}>{item.text}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isChatMode ? "Chat App" : "Comment App"}
        </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Switch mode</Text>
          <Switch
            value={isChatMode}
            onValueChange={() => setIsChatMode((prev) => !prev)}
          />
        </View>
      </View>

      <FlatList
        data={isChatMode ? messages : comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted={isChatMode}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={
            isChatMode ? "Type a message..." : "Write a comment..."
          }
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>
            {isChatMode ? "Send" : "Post"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  // Chat-specific
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    maxWidth: "80%",
  },
  leftAlign: {
    alignSelf: "flex-start",
  },
  rightAlign: {
    alignSelf: "flex-end",
  },
  bubble: {
    padding: 10,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: "#007BFF",
    borderTopRightRadius: 0,
  },
  otherUserBubble: {
    backgroundColor: "#e5e5ea",
    borderTopLeftRadius: 0,
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
    color: "#555",
  },
  text: {
    fontSize: 14,
  },
  currentUserText: {
    color: "#fff",
  },
  otherUserText: {
    color: "#333",
  },
  // Comment-specific
  commentBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  comment: {
    fontSize: 14,
    color: "#555",
  },
});