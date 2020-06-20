import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import AllAccidentList from '../../components/AllAccidentList';
import {Context} from '../../context/AccidentContext';

const AllAccident = ({navigation}) => {
    const {state, getAllAccident} = useContext(Context);

    useEffect(() => {
        getAllAccident('Pending');
        const listiner = navigation.addListener('didFocus', () => {
            getAllAccident('Pending');
        });
    }, []);

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 15,
                }}>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#4c4ce3'}}
                    mode="contained"
                    onPress={() => getAllAccident('Pending')}>
                    Pending
                </Button>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#008d02'}}
                    mode="contained"
                    onPress={() => getAllAccident('Success')}>
                    Success
                </Button>
            </View>
            <View>
                <AllAccidentList data={state} navigation={navigation}/>
            </View>
        </>
    );
};

export default AllAccident;
