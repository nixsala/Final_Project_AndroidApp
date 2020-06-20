import {createStackNavigator} from 'react-navigation-stack';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createAppContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import AccountScreen from '../screens/profile/AccountScreen';

import AccountInfo from '../screens/user/AccountInfo';
import AddRequest from '../screens/user/AddRequest';
import MyAccident from '../screens/user/MyAccident';

import AccidentDetail from '../screens/driver/AccidentDetail';
import AllAccident from '../screens/driver/AllAccident';
import Donar from '../screens/driver/Donar';
import DonarDetail from '../screens/driver/DonarDetail';

import AllUser from '../screens/admin/AllUser';
import Driverlist from '../screens/admin/Driverlist';
import UserDetail from '../screens/admin/UserDetail';
import DriverList from '../screens/admin/Driverlist';
import AddDriver from '../screens/admin/AddDriver';

import AuthLoading from '../screens/auth/AuthLoading';

import ResolveAuthScreen from './ResolveAuthScreen';
import React from 'react';
import {View, Text} from 'react-native';
import DriverDetail from '../screens/admin/DriverDetail';

const iconSize = 24;


const AccidentInfo = createStackNavigator({
    AllAccident: {screen: AllAccident},
    AccidentDetail: {screen: AccidentDetail},
    Donar: {screen: Donar},
    DonarDetail: {screen: DonarDetail},
});

const userInfo = createStackNavigator({
    AllUser: {screen: AllUser},
    UserDetail: {screen: UserDetail},
});
const driverInfo = createStackNavigator({
    DriverList: {screen: DriverList},
    DriverDetail: {screen: DriverDetail},
    AddDriver: {screen: AddDriver},
});

const switchNavigator = createSwitchNavigator(
    {
        ResolveAuth: ResolveAuthScreen,
        loginFlow: createStackNavigator({
            SignIn: SignInScreen,
            SignUp: SignUpScreen,
        }),

        userFlow: createMaterialBottomTabNavigator(
            // createBottomTabNavigator
            {
                MyAccident: {
                    screen: MyAccident,
                    navigationOptions: {
                        tabBarLabel: 'Home',
                        tabBarIcon: ({tintColor}) => (
                            <Icon name="home" color={tintColor} size={24}/>
                        ),
                    },
                },
                AddRequest: {
                    screen: AddRequest,
                    navigationOptions: {
                        tabBarLabel: 'Request',
                        tabBarIcon: ({tintColor}) => (
                            <Ionicons
                                name="md-add-circle-outline"
                                color={tintColor}
                                size={iconSize}
                            />
                        ),
                    },
                },
                AccountInfo: {
                    screen: AccountInfo,
                    navigationOptions: {
                        tabBarLabel: 'Account',
                        tabBarIcon: ({tintColor}) => (
                            <MaterialCommunityIcons
                name="account"
                color={tintColor}
                size={iconSize}
              />
            ),
          },
        },
      },
      {
        initialRouteName: 'MyAccident',
        activeColor: '#f0edf6',
        inactiveColor: '#9f8de2',
        // barStyle: {backgroundColor: '#694fad'},
      },
    ),
    driverFlow: createMaterialBottomTabNavigator({
        AllAccident: {
            screen: AccidentInfo,
            navigationOptions: {
                tabBarLabel: 'Accident',
                tabBarIcon: ({tintColor}) => (
                    <MaterialIcons
                        name="event-seat"
                        color={tintColor}
                        size={iconSize}
                    />
                ),
            },
        },
        // Donar: {
        //   screen: Donar,
        //   navigationOptions: {
        //     tabBarLabel: 'Donar',
        //     tabBarIcon: ({tintColor}) => (
        //       <FontAwesome5 name="users" color={tintColor} size={iconSize} />
        //     ),
        //   },
        // },
        AccountInfo: {
            screen: AccountInfo,
            navigationOptions: {
                tabBarLabel: 'Account',
                tabBarIcon: ({tintColor}) => (
                    <MaterialCommunityIcons
                        name="account"
                        color={tintColor}
                        size={iconSize}
                    />
                ),
            },
        },
    }),
        adminFlow: createMaterialBottomTabNavigator(
            {
                AllUser: {
                    screen: userInfo,
                    navigationOptions: {
                        tabBarLabel: 'User',
                        tabBarIcon: ({tintColor}) => (
                            <Icon name="users" color={tintColor} size={20}/>
                        ),
                    },
                },
                DriverList: {
                    screen: driverInfo,
                    navigationOptions: {
                        tabBarLabel: 'Driver',
                        tabBarIcon: ({tintColor}) => (
                            <FontAwesome5
                                name="user-astronaut"
                                color={tintColor}
                                size={iconSize}
                            />
                        ),
                    },
                },
                AccountInfo: {
                    screen: AccountInfo,
                    navigationOptions: {
                        tabBarLabel: 'Account',
                        tabBarIcon: ({tintColor}) => (
                            <MaterialCommunityIcons
                                name="account"
                                color={tintColor}
                                size={iconSize}
                            />
                        ),
                    },
                },
            },
            {
                initialRouteName: 'AllUser',
                activeColor: '#f0edf6',
                inactiveColor: '#9f8de2',
                // barStyle: {backgroundColor: '#694fad'},
            },
        ),
    },
    {
        // initialRouteName: 'loginFlow',
        defaultNavigationOptions: {
            title: 'Login',
        },
    },
);

const RouteNavigator = createAppContainer(switchNavigator);

export default RouteNavigator;
