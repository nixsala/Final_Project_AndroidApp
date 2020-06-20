import React, {useContext, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Card, Paragraph, Title, Snackbar} from 'react-native-paper';
import moment from 'moment';
import MapView from 'react-native-maps';
import axios from 'axios';
import jsonServer from '../../api/jsonServer1';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Picker} from '@react-native-community/picker';
import {Context} from '../../context/AccidentContext';
import {acc} from 'react-native-reanimated';

const AccidentDetail = ({navigation}) => {
    const {state, getAllAccident, editAccident} = useContext(Context);

    const accident = state.find(
        (state) => state.id === navigation.getParam('id'),
    );


    const changeStatus1 = () => {
        editAccident(navigation.getParam('accidentId'), 'Success');
    };

    useEffect(() => {
    }, []);

    // const [data, setData] = useState('');
    const [user, setUser] = useState('');
    const [status, setStatus] = useState('');

    const [change, setChange] = useState('');

    const [visible, setVisible] = useState(false);
    return (
        <ScrollView>
            <View style={{marginHorizontal: 15, marginTop: 15}}>
                <Card>
                    {accident.accidentUser && (
                        <Card.Content>
                            <Title>Name : {accident.accidentUser.name}</Title>
                            <Text>Email Address: {accident.accidentUser.email}</Text>
                            <Text>
                                Accident Date:{' '}
                                {moment(accident.createdAt).format('Do MMM YYYY')}
                            </Text>
                            <Paragraph>{accident.description}</Paragraph>
                        </Card.Content>
                    )}

                    <View
                        style={{
                            height: 200,
                            width: '100%',
                            backgroundColor: 'white',
                        }}>
                        {accident.location && (
                            <Card.Content>
                                <MapView
                                    // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={{height: '100%', width: '100%'}}
                                    mapType="standard"
                                    pitchEnabled={false}
                                    showsUserLocation={false}
                                    followsUserLocation={false}
                                    zoomControlEnabled={false}
                                    showsCompass={false}
                                    showsBuildings={false}
                                    // showsTraffic={true}
                                    initialRegion={{
                                        latitude: parseFloat(accident.location.latitude),
                                        longitude: parseFloat(accident.location.longitude),
                                        latitudeDelta: 1,
                                        longitudeDelta: 1,
                                    }}>
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: parseFloat(accident.location.latitude),
                                            longitude: parseFloat(accident.location.longitude),
                                        }}
                                        title="sdsadsa"
                                        description="asdsad"
                                    />
                                </MapView>
                            </Card.Content>
                        )}
                    </View>

                    <Card.Content>
                        <View
                            style={{
                                borderColor: 'grey',
                                borderWidth: 1,
                                borderRadius: 5,
                                backgroundColor: '#ffffff10',
                                marginVertical: 20,
                            }}>
                            {/*    const changeStatus1= () => {*/}
                            {/*    editAccident('5ec37cf8abafdd2eb855441d','Pending')*/}
                            {/*}*/}
                            <Button>Staus : {accident.status}</Button>
                            {/*<Picker*/}
                            {/*  selectedValue={accident.status}*/}
                            {/*  style={{*/}
                            {/*    height: 50,*/}
                            {/*    width: '100%',*/}
                            {/*    margin: 2,*/}
                            {/*    color: '#00000090',*/}
                            {/*  }}*/}
                            {/*  disable*/}
                            {/*  onValueChange={async (data) => {*/}
                            {/*    await editAccident(navigation.getParam('id'), data);*/}
                            {/*    await getAllAccident(data);*/}
                            {/*    // await setVisible(true);*/}
                            {/*  }}>*/}
                            {/*  <Picker.Item label="Pending" value="Pending" />*/}
                            {/*  <Picker.Item label="Success" value="Success" />*/}
                            {/*</Picker>*/}
                        </View>
                    </Card.Content>
                    {accident.accidentUser && (
                        <Card.Content>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row', flex: 5}}>
                                    <View style={{marginTop: 5}}>
                                        <Entypo name="user" size={20} color="#0a00b6"/>
                                    </View>
                                    <Title style={{marginLeft: 10}}>
                                        Age: {accident.accidentUser.age}
                                    </Title>
                                </View>
                                <View style={{flexDirection: 'row', flex: 2}}>
                                    <View style={{marginTop: 5}}>
                                        <Fontisto name="blood-drop" size={20} color="#ff1122"/>
                                    </View>
                                    <Title style={{marginLeft: 10}}>
                                        {accident.accidentUser.bloodType}
                                    </Title>
                                </View>
                            </View>
                            {accident.donarUser === null ? (
                                <View
                                    style={{
                                        width: '80%',
                                        alignSelf: 'center',
                                        marginVertical: 10,
                                    }}>
                                    <Button
                                        mode="contained"
                                        onPress={() =>
                                            navigation.navigate('Donar', {
                                                accidentId: navigation.getParam('id'),
                                                accidentUser: accident.accidentUser._id,
                                                accidentUserBlood: accident.accidentUser.bloodType,
                                            })
                                        }>
                                        Find Donar
                                    </Button>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        borderColor: '#0000080',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        padding: 10,
                                        marginTop: 10,
                                    }}>
                                    <Text
                                        style={{
                                            alignSelf: 'center',
                                            fontSize: 20,
                                            color: '#5e35b1',

                                            fontWeight: 'bold',
                                        }}>
                                        Donas Info
                                    </Text>
                                    <Card.Content>
                                        <Paragraph>Name: {accident.donarUser.name}</Paragraph>
                                        <Paragraph>
                                            Email Address: {accident.donarUser.email}
                                        </Paragraph>
                                        <Paragraph>
                                            Blood Group: {accident.donarUser.bloodType}
                                        </Paragraph>
                                    </Card.Content>
                                </View>
                            )}
                        </Card.Content>
                    )}
                </Card>
                <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
                    Change Status Succesfully
                </Snackbar>
            </View>
        </ScrollView>
    );
};

export default AccidentDetail;
