import React from 'react';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import {FlatList, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import MapView from 'react-native-maps';

const AllAccidentList = ({data, onPress, navigation}) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return (
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('AccidentDetail', {id: item.id})
                                }>
                                <Card
                                    style={{
                                        width: '90%',
                                        alignSelf: 'center',
                                        marginVertical: 5,
                                    }}>
                                    <Card title="Card Title" subtitle="Card Subtitle"/>
                                    <Card.Content>
                                        {item.accidentUser && (
                                            <Title>{item.accidentUser.name}</Title>
                                        )}
                                        <Paragraph>
                                            {moment(item.createdAt).format('MMM Do YY')}
                                        </Paragraph>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button>{item.status}</Button>
                                    </Card.Actions>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default AllAccidentList;
