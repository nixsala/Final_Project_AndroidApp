import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Button, Headline, Snackbar, Switch, Title} from 'react-native-paper';
import {Form, TextInput} from '../../helper/react-native-autofocus';
import {Picker} from '@react-native-community/picker';
import {Spacer0} from '../../components/Spacer';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import UserListItem from '../../components/UserListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Driverlist = ({navigation}) => {
    const {state, getDriverList, getUserList} = useContext(Context);

    // useEffect(() => {
    //   getDriverList();
    //     const listiner = navigation.addListener('didFocus', () =>
    //         getDriverList() )
    // }, []);

    useEffect(() => {
        getDriverList();
        const listiner = navigation.addListener('didFocus', async () => {
            // await getUserList('true', 'false');
            await getDriverList();
        });
    }, []);

    const token = AsyncStorage.getItem('token');

    const onToggleSwitch = () => {
        setEnable((enabel) => !enabel);
        setData({...data, donate: !enabel});
    };
    const [enabel, setEnable] = useState(false);
    const [snack, setSnack] = useState(false);
    return (
        <>
            {/*<Headline style={{alignSelf: 'center', marginVertical: 10}}>*/}
            {/*  Driver List*/}
            {/*</Headline>*/}
            <ScrollView style={{marginTop: 10}}>
                {/*<Text>{JSON.stringify(state.driverList)}</Text>*/}
                <UserListItem
                    data={state.driverList}
                    navigation={navigation}
                    role="driver"
                />
            </ScrollView>
        </>
    );
};

Driverlist.navigationOptions = ({navigation}) => {
    return {
        headerTitle: 'Driver List',

        headerRight: () => (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('AddDriver', {id: navigation.getParam('_id')})
                }>
                <View style={{marginRight: 10}}>
                    <Ionicons name="md-person-add" size={30} color="#651fff"/>
                </View>
            </TouchableOpacity>
        ),
    };
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

export default Driverlist;
