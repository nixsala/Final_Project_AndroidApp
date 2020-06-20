import React, {useContext} from 'react';
import {Button, Card, Paragraph, Title} from 'react-native-paper';
import {FlatList, TouchableOpacity, View, Alert} from 'react-native';
import moment, {now} from 'moment';
import {Context} from '../context/AccidentContext';
import {Context as AuthContext} from '../context/AuthContext';

const DonarList = ({data, accident, navigation}) => {
    const {state, editAccident, editAccidentDonar} = useContext(Context);
    const {editDonateDate} = useContext(AuthContext);
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return (
                        <View>
                            {/*<TouchableOpacity*/}
                            {/*  onPress={() => navigation.navigate('DonarDetail', {id: item.id})}>*/}
                            <Card
                                style={{
                                    width: '90%',
                                    alignSelf: 'center',
                                    marginVertical: 5,
                                }}>
                                <Card title="Card Title" subtitle="Card Subtitle"/>
                                <Card.Content>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 2}}>
                                            <Title>Name: {item.name}</Title>
                                            <Paragraph>Blood Group : {item.bloodType}</Paragraph>
                                            <Paragraph>Age : {item.age}</Paragraph>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center'}}>
                                            <Button
                                                mode="outlined"
                                                onPress={async () => {
                                                    await editAccidentDonar(accident, item.id);
                                                    await editAccident(accident, 'Success');
                                                    await editDonateDate(item.id, now());
                                                    await Alert.alert(
                                                        'Assign Donar',
                                                        'Do you need to Assign This Donar',
                                                        [
                                                            {
                                                                text: 'Cancel',
                                                                onPress: () => console.log('Cancel Pressed'),
                                                                style: 'cancel',
                                                            },
                                                            {
                                                                text: 'OK',
                                                                onPress: () =>
                                                                    navigation.navigate('AllAccident'),
                                                            },
                                                        ],
                                                        {cancelable: false},
                                                    );
                                                }}>
                                                Select
                                            </Button>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                            {/*</TouchableOpacity>*/}
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default DonarList;
