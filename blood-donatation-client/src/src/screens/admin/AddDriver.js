import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Button, Snackbar, Switch, Title} from 'react-native-paper';
import {Form, TextInput} from '../../helper/react-native-autofocus';
import {Picker} from '@react-native-community/picker';
import {Spacer0} from '../../components/Spacer';
import {Context} from '../../context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';

const AddDriver = ({navigation}) => {
    const {
        state,
        signin,
        signup,
        driverRegister,
        clearErrorMessage,
        errorMessage,
    } = useContext(Context);

    const token = AsyncStorage.getItem('token');

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        role: 'driver',
        bloodType: '',
        donate: false,
        verify: false,
    });

    const signupAction = () => {
        if (data.name === '') {
            errorMessage({error: 'Name Required'});
            setSnack(true);
        } else if (data.email === '') {
            errorMessage({error: 'Email Required'});
            setSnack(true);
        } else if (data.password === '') {
            errorMessage({error: 'Password Required'});
            setSnack(true);
        } else if (data.age === null) {
            setSnack(true);
        } else if (data.bloodType === '') {
            errorMessage({error: 'Select Blood Type'});
            setSnack(true);
        } else {
            signup(data);
            errorMessage({error: 'Success'});
            setSnack(true);
        }

        // signup(data);
    };

    const onToggleSwitch = () => {
        setEnable((enabel) => !enabel);
        setData({...data, donate: !enabel});
    };
    const [enabel, setEnable] = useState(false);
    const [snack, setSnack] = useState(false);
    return (
        <SafeAreaView>
            {/*<NavigationEvents onWillBlur={clearErrorMessage} />*/}
            <ScrollView>
                <Title style={{alignSelf: 'center', fontSize: 25}}>
                    Driver Registration
                </Title>
                <View style={styles.container}>
                    {/*<Spacer />*/}
                    {/*{state.errorMessage ? <Text>{state.errorMessage}</Text> : null}*/}
                    <Form>
                        <TextInput
                            placeholder="Name"
                            // autoFocus={true}
                            label="Name"
                            onChangeText={(text) => setData({...data, name: text})}
                            value={data.name}
                            autoCapitalize="none"
                            autoCorrect={false}
                            mode="outlined"
                        />
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
                        <TextInput
                            placeholder="Age"
                            label="Age"
                            keyboardType="decimal-pad"
                            onChangeText={(text) => setData({...data, age: text})}
                            value={data.age}
                            mode="outlined"
                        />
                    </Form>
                    <View
                        style={{
                            borderColor: 'grey',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#ffffff10',
                            marginTop: 10,
                        }}>
                        <Picker
                            selectedValue={data.bloodType}
                            style={{height: 50, width: '100%', margin: 2, color: '#00000090'}}
                            onValueChange={(itemValue, itemIndex) =>
                                setData({...data, bloodType: itemValue})
                            }>
                            <Picker.Item label="O positive" value="O+"/>
                            <Picker.Item label="O negative" value="O-"/>
                            <Picker.Item label="A positive" value="A+"/>
                            <Picker.Item label="A negative" value="A-"/>
                            <Picker.Item label="B positive" value="B+"/>
                            <Picker.Item label="B negative" value="B-"/>
                            <Picker.Item label="AB positive" value="AB+"/>
                            <Picker.Item label="AB negative" value="AB-"/>
                        </Picker>
                    </View>
                    <Spacer0/>
                    <View
                        flexDirection="row"
                        style={{
                            padding: 12,
                            backgroundColor: '#ffffff30',
                            borderColor: '#00000080',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}>
                        <Text flex={2} style={{color: '#00000090'}}>
                            Driver wish to Donate Blood
                        </Text>
                        <Switch flex={1} value={enabel} onValueChange={onToggleSwitch}/>
                    </View>

                    <Spacer0/>
                    <Button
                        onPress={async () => {
                            await driverRegister(data);
                            await navigation.navigate('DriverList');
                        }}
                        mode="contained">
                        Register
                    </Button>
                </View>
                <Snackbar
                    visible={snack}
                    onDismiss={() => setSnack(false)}
                    action={{
                        // label: 'Undo',
                        onPress: () => {
                            // Do something
                        },
                    }}>
                    {state.errorMessage}
                </Snackbar>
            </ScrollView>
        </SafeAreaView>
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

export default AddDriver;
