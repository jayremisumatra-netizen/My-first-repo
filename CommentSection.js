import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: "1", user: "eze kyn", text: "Lagi lamia pre! " },
    { id: "2", user: "Diether", text: "Tan awa pre lami kaayo " },
  ]);

  const [newComment, setNewComment] = useState("");

  // Function to handle adding a comment
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const comment = {
      id: Date.now().toString(),
      user: "Junveil Hans",
      text: newComment.trim(),
    };

    setComments([comment, ...comments]);
    setNewComment("");
    Keyboard.dismiss(); // Hide the keyboard
  };

  // Render each comment item
  const renderComment = ({ item }) => (
    <View style={styles.commentBox}>
      <Text style={styles.username}>{item.user}</Text>
      <Text style={styles.comment}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>

      {/* Comment List */}
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.noComments}>No comments yet.</Text>}
      />

      {/* Add Comment Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddComment}>
          <Text style={styles.buttonText}>send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  commentBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  username: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 4,
  },
  comment: {
    fontSize: 14,
    color: "#555",
  },
  noComments: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
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
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
