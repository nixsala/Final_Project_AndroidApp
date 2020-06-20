import React from 'react';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {FlatList, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import MapView from 'react-native-maps';

const UserListItem = ({data, onPress, navigation, role}) => {
    return (
        <>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => {
                                    role == 'driver'
                                        ? navigation.navigate('DriverDetail', {id: item.id})
                                        :
                                        navigation.navigate('UserDetail', {id: item.id});
                                }
                                }>
                                <Card
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        marginVertical: 5,
                                    }}>
                                    <Card title="Card Title" subtitle="Card Subtitle"/>
                                    <Card.Content>
                                        <Title>{item.name}</Title>
                                        <Paragraph>
                                            Register Date :
                                            {moment(item.createdAt).format('MMM Do YY')}
                                        </Paragraph>
                                        <Paragraph>Email :{item.email}</Paragraph>
                                    </Card.Content>
                                </Card>
                            </TouchableOpacity>
                        </>
                    );
                }}
            />
        </>
    );
};

export default UserListItem;
