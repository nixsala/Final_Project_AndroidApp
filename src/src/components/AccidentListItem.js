import React, {useEffect} from 'react';
import {View, FlatList, ScrollView, Share} from 'react-native';
import {Button, Card, Headline, Paragraph, Title} from 'react-native-paper';
import {Text} from 'react-native-elements';
import jsonServer from '../api/jsonServer1';

// import Moment from 'react-moment';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Spacer} from './Spacer';
import moment from 'moment';

const AccidentListItem = ({data}) => {
    // useEffect(() => {
    //   const response = jsonServer.get(`/api/location?id=${item.location}`);
    //   console.log(response);
    // }, []);

    const onShare = async (item) => {
        try {
            const result = await Share.share({
                title: 'Accident',
                message: `${item.accidentUser.name} was accident in http://www.google.com/maps/place/${item.location.latitude},${item.location.longitude} I need ${item.accidentUser.bloodType} Blood`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <ScrollView>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    return (
                        <View style={{marginBottom: 20, marginHorizontal: '5%'}}>
                            <Card>
                                <Card.Content>
                                    <Title>{moment(item.createdAt).format('MMM Do YY')}</Title>
                                    <Paragraph>{item.description}</Paragraph>
                                </Card.Content>

                                <View
                                    style={{
                                        height: 200,
                                        width: '100%',
                                        backgroundColor: 'white',
                                    }}>
                                    {/*<Text>{JSON.stringify(item.location)}</Text>*/}
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
                                            latitude: parseFloat(item.location.latitude),
                                            longitude: parseFloat(item.location.longitude),
                                            latitudeDelta: 1,
                                            longitudeDelta: 1,
                                        }}>
                                        <MapView.Marker
                                            coordinate={{
                                                latitude: parseFloat(item.location.latitude),
                                                longitude: parseFloat(item.location.longitude),
                                            }}
                                            title="sdsadsa"
                                            description="asdsad"
                                        />
                                    </MapView>
                                </View>
                                <Card.Actions>
                                    <Button>{item.status}</Button>
                                </Card.Actions>
                                <Button
                                    mode="contained"
                                    style={{width: '40%', alignSelf: 'center', marginBottom: 10}}
                                    onPress={() => onShare(item)}>
                                    Share{' '}
                                </Button>
                            </Card>
                        </View>
                    );
                }}
            />
        </ScrollView>
    );
};

export default AccidentListItem;
