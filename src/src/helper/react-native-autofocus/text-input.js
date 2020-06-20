import React from 'react';
import {View} from 'react-native';

import {TextInput as Input} from 'react-native-paper';

const TextInput = ({onSubmitEditing, onEnter, inputRef, ...props}) => (
  <View style={{marginBottom: 10}}>
    <Input
      ref={(ref) => inputRef(ref)}
      onSubmitEditing={() => {
        if (onEnter) {
          onEnter();
        }
        if (onSubmitEditing) {
          onSubmitEditing();
        }
      }}
      {...props}
    />
  </View>
);

export default TextInput;
