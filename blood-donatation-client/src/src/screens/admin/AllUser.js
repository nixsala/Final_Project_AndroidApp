import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import AllAccidentList from '../../components/AllAccidentList';
import {Context} from '../../context/AuthContext';
import UserListItem from '../../components/UserListItem';

const AllUser = ({navigation}) => {
    const {state, getUserList} = useContext(Context);
    const donate = 'true';

    useEffect(() => {
        getUserList(donate, verify);
        const listiner = navigation.addListener('didFocus', () => {
            getUserList(donate, verify);
        });
    }, []);

    const [verify, setVerify] = useState('false');

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
                    onPress={() => {
                        getUserList(donate, 'false');
                    }}>
                    Pending
                </Button>
                <Button
                    style={{flex: 1}}
                    contentStyle={{backgroundColor: '#008d02'}}
                    mode="contained"
                    onPress={() => {
                        getUserList(donate, 'true');
                    }}>
                    Approved
                </Button>
            </View>

            <>
                <UserListItem data={state.userList} navigation={navigation} role="user"/>
                {/*<AllAccidentList data={state.userList} navigation={navigation} />*/}
            </>
        </>
    );
};

export default AllUser;
