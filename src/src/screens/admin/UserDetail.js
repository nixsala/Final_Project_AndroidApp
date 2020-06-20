import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  Title,
  Snackbar,
  Switch,
  ActivityIndicator,
} from 'react-native-paper';
import moment from 'moment';
import MapView from 'react-native-maps';
import axios from 'axios';
import jsonServer from '../../api/jsonServer1';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-community/picker';
import {Context} from '../../context/AuthContext';
import {acc} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Driverlist from './Driverlist';
// import { HeaderBackButton } from "@react-navigation/stack";

const UserDetail = ({navigation, role}) => {
  const {state, getUserList, getDriverList, editUser} = useContext(Context);

  useEffect(() => {
    (async () => {
      const user = await state.userList.find(
          (state) => state.id === navigation.getParam('id'),
      );
      // await setVerify('dd');
      await setData(user);
      const ver = user.verifyUser;
      await setVerify(ver);
      // await console.log({ve: verify.vv});
    })();
  }, []);

  const [data, setData] = useState('');
  const [verify, setVerify] = useState('');

  const [change, setChange] = useState('');

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const [visible, setVisible] = useState(false);
  // () => setVerify(data.verifyUser);

  const onToggleSwitch = () => {
    setEnable((enabel) => !enabel);
    // setData({...data, donate: !enabel});
  };
  const [enabel, setEnable] = useState(false);
  const db = 'true';

  return (
      <View style={{marginHorizontal: 15, marginTop: 15}}>
        <Card>
          {/*{data && (*/}
          <Card.Content>
            <Title>Name : {data.name}</Title>
            <Text> Email Address: {data.email}</Text>
            <Text>{moment(data.createdAt).format('Do MMM YYYY HH MM SS')}</Text>
          </Card.Content>
          {/*)}*/}

          <Card.Content>
            <View
                style={{
                  borderColor: 'grey',
                  borderWidth: 1,
                  borderRadius: 5,
                  backgroundColor: '#ffffff10',
                  marginVertical: 20,
                }}>
              {data.verifyUser == 'false' ? (
                  <>
                    <Button
                        onPress={() => {
                          Alert.alert(
                              'Confirm The change',
                              'The User can able to donate blood',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: async () => {
                                    await editUser(navigation.getParam('id'), 'true');
                                    await console.log(navigation.getParam('id'));
                                    await navigation.navigate('AllUser');
                                  },
                                },
                              ],
                              {cancelable: false},
                          );
                          getUserList();
                        }}>
                      Change As Donar
                    </Button>
                  </>
              ) : (
                  <>
                    <Button
                        onPress={() => {
                          Alert.alert(
                              'Confirm The change',
                              'The User can not able to donate blood',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: async () => {
                                    await editUser(navigation.getParam('id'), 'false');
                                    await console.log(navigation.getParam('id'));
                                    await navigation.navigate('AllUser');
                                  },
                                },
                              ],
                              {cancelable: false},
                          );
                          getUserList();
                        }}>
                      Remove From Donar List
                    </Button>
                  </>
              )}
            </View>
          </Card.Content>
          <Card.Content>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', flex: 5}}>
                <View style={{marginTop: 5}}>
                  <Entypo name="user" size={20} color="#0a00b6"/>
                </View>
                <Title style={{marginLeft: 10}}>Age: {data.age}</Title>
              </View>
              <View style={{flexDirection: 'row', flex: 2}}>
                <View style={{marginTop: 5}}>
                  <Fontisto name="blood-drop" size={20} color="#ff1122"/>
                </View>
                <Title style={{marginLeft: 10}}>{data.bloodType}</Title>
              </View>
            </View>
          </Card.Content>
        </Card>
        <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
          Change Status Succesfully
        </Snackbar>
      </View>
  );
};

UserDetail.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'User Detail',
  };
};

export default UserDetail;
