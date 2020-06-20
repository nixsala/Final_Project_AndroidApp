import React from 'react';
import {View, Text} from 'react-native';

const ListItem = (props) => {
  return (
    <View style={{flexDirection:'row',padding:5}}>
        <Text style={{flex:2,fontWeight:'bold'}}>{props.title}</Text>
        <Text style={{flex:3}}>{props.detail}</Text>
    </View>
  );
};

export default ListItem;
