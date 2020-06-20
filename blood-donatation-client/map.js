/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView, {PROVIDER_GOOGLE, Polyline, Geojson} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
navigator.geolocation = require('@react-native-community/geolocation');

const map: () => React$Node = () => {
  useEffect(() => {
    // Update the document title using the browser API
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // const location = JSON.stringify(position);

        await setLocation(position.coords);
        await console.log({eg: location.timestamp});
        await console.log(location);
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);
  Geolocation.getCurrentPosition((info) => console.log(info));
  const [location, setLocation] = useState([]);

  const myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude],
        },
      },
    ],
  };

  const findCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition(
      async (position) => {
        // const location = JSON.stringify(position);

        await setLocation(position.coords);
        await console.log({eg: location.latitude});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  console.log({myPlace});

  return (
    <View>
      <Text>ravi</Text>
      {/*<Button title="request permissions" onPress={requestCameraPermission} />*/}

      <Text />

      <MapView
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{
            height: 300,
            width: 300,
          }}
          mapType="standard"
          pitchEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
          zoomControlEnabled={true}
          showsCompass={true}
          showsBuildings={true}
          // showsTraffic={true}

          initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 3.115,
          longitudeDelta: 3.0121,
        }}>
        <Geojson
          geojson={myPlace}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
        />
        <MapView.Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="tiittt"
          description="dsidsjidj"
        />
      </MapView>
      <TouchableOpacity onPress={findCoordinates}>
        <Text>Find My Coords?{location.mocked}</Text>
        <Text>
          Location:
          {JSON.stringify({loc: location})}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: 300,
    width: 300,
    // ...StyleSheet.absoluteFillObject,
  },
});

export default map;
