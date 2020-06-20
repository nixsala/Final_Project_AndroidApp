import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {
  ActivityIndicator,
  Headline,
  Button,
  Snackbar,
  Title,
  TextInput,
  Avatar,
  Card,
  Paragraph,
} from 'react-native-paper';
import {Spacer, Spacer0, Spacer2, Spacer1} from '../../components/Spacer';
import {Form} from '../../helper/react-native-autofocus';
import {Text} from 'react-native-elements';
import ListItem from '../../components/ListItem';
import {Context} from '../../context/AccidentContext';
import {Context as AuthContext} from '../../context/AccidentContext';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import jsonServer from '../../api/jsonServer1';
import AccidentListItem from '../../components/AccidentListItem';

const MyAccident = ({navigation}) => {
  const {state, getAccidentByUser} = useContext(Context);

  useEffect(() => {
      console.log('rav1');

      (async (id) => {
          const value = await AsyncStorage.getItem('ID');
          await setId(value);
          await console.log({getdid: value});
          await getAccidentByUser(value, 'Pending');

      })();
  }, []);

    const listiner = navigation.addListener('willFocus', async () => {
        const id = await AsyncStorage.getItem('ID');
        await getAccidentByUser(id, 'Pending');
    });

    // const listiner = navigation.addListener('willFocus', async () => {
    //   // const value = await AsyncStorage.getItem('ID');
    //   // await setId(value);
    //   await getAccidentByUser(id, 'Pending');
    // });

    const [id, setId] = useState();
    const [status, setStatus] = useState('Pending');

    return (
        <>
            <Headline
                style={{
                    alignSelf: 'center',
                    marginVertical: 10,
                    fontWeight: 'bold',
                    color: '#814be3',
                }}>
                Accident List
            </Headline>
            <View
                style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 15,
                }}>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#4c4ce3'}}
                    mode="contained"
                    onPress={() => getAccidentByUser(id, 'Pending')}>
                    Pending
                </Button>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#008d02'}}
                    mode="contained"
                    onPress={() => getAccidentByUser(id, 'Success')}>
                    Success
                </Button>
            </View>
            <ScrollView>
                {/*<Text>df</Text>*/}
                {/*<Text>{JSON.stringify(state)}</Text>*/}
                <AccidentListItem data={state}/>
            </ScrollView>
        </>
    );
};

export default MyAccident;
