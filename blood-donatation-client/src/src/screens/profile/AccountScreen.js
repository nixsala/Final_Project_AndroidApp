import React, {Component, useContext} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
// import MapView from 'react-native-maps';

// const CreateScreen = ({navigation}) => {
//
//   return (
//     <SafeAreaView forceInset={{top: 'always'}}>
//       <View>
//         <Text>profile {id}</Text>
//       </View>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     </SafeAreaView>
//   );
// };

export default class CreateScreen extends Component {
  render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const {state, addBlogsPost} = useContext(Context);

    // const id = navigation.getParam('id');

    // console.log(state);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text>profile </Text>
        </View>
        {/*<MapView*/}
        {/*  style={styles.map}*/}
        {/*  initialRegion={{*/}
        {/*    latitude: 37.78825,*/}
        {/*    longitude: -122.4324,*/}
        {/*    latitudeDelta: 0.0922,*/}
        {/*    longitudeDelta: 0.0421,*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 5,
  },
  map: {
    height: 300,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
});
