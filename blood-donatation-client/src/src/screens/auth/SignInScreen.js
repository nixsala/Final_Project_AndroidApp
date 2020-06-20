import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LoginFrom from '../../components/SignInForm';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

import {Text} from 'react-native-elements';
import {Spacer, Spacer0} from '../../components/Spacer';
import {
  Button,
  Title,
  Surface,
  Card,
  Checkbox,
  Switch,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import NavLink from '../../routes/NavLink';
import {Form, TextInput} from '../../../src/helper/react-native-autofocus';
import {Picker} from '@react-native-community/picker';

const SignInScreen = ({navigation}) => {
  const {state, signin, clearErrorMessage, errorMessage} = useContext(Context);
  // const {  login} = useContext(Context);

  // const onSubmit= async (username,password) => {
  //     await login(username,password, () => {
  //         navigation.navigate('App');
  //     });
  // };
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const signInAction = () => {
    if (data.email === '') {
      errorMessage({error: 'Email Required'});
      setSnack(true);
    } else if (data.password === '') {
      errorMessage({error: 'Password Required'});
      setSnack(true);
    } else {
      setLoader(true);
      signin(data);
      errorMessage({error: 'Success'});
      setSnack(true);
      setLoader(false);
      setSnack(false);
    }

    // signup(data);
  };
  const [loader, setLoader] = useState(false);
  const [snack, setSnack] = useState(false);
  return (
    // <SafeAreaView>
    <View
      style={{
        marginTop: 100,
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Text h3 style={{alignSelf: 'center'}}>
        Blood Donate Title?
      </Text>
      {/*<Text>{JSON.stringify(state)}</Text>*/}
      <ScrollView>
        <Title style={{alignSelf: 'center', fontSize: 25}}> Sign In</Title>
        <View style={styles.container}>
          <Spacer />
          {/*{state.errorMessage ? <Text>{state.errorMessage}</Text> : null}*/}
          <Form>
            <TextInput
              placeholder="Email"
              // autoFocus={true}
              label="Email"
              onChangeText={(text) => setData({...data, email: text})}
              value={data.email}
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
            />
            <TextInput
              placeholder="Password"
              label="Password"
              onChangeText={(text) => setData({...data, password: text})}
              value={data.password}
              secureTextEntry
              mode="outlined"
            />
          </Form>
          <Spacer0 />

          <Spacer0 />
          {!loader ? (
            <Button onPress={() => signInAction(data)} mode="contained">
              Login
            </Button>
          ) : (
            <ActivityIndicator animating={true} />
          )}
          <Button onPress={() => navigation.navigate('SignUp')}>
            Already have an account? Sign in instend
          </Button>
          {/*<NavLink text="Already have an account?" routeName="SignIn" />*/}
        </View>
        <Snackbar
          visible={snack}
          onDismiss={() => setSnack(false)}
          action={
            {
              // label: 'Ok',
              // onPress: () => {
              // Do something
              // },
            }
          }>
          {state.errorMessage}
        </Snackbar>
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
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
  login: {
    height: '100%',
    justifyContent: 'center',
  },
});

SignInScreen.navigationOptions = ({navigation}) => {
  return {
    headerShown: false,
  };
};

export default SignInScreen;
