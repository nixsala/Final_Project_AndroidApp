import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const LoginForm = ({onSubmit, state}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUserName(text)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Button title="Login" onPress={() => onSubmit({username, password})} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default LoginForm;
