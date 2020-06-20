import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Spacer = ({children}) => {
  return (
    <View style={styles.spacer}>
      <Text>{children}</Text>
    </View>
  );
};

export const Spacer1 = ({children}) => {
    return (
        <View style={styles.spacer1}>
            <Text>{children}</Text>
        </View>
    );
};

export const Spacer0 = ({children}) => {
  return (
    <View style={styles.spacer0}>
      <Text>{children}</Text>
    </View>
  );
};
export const Spacer2 = ({children}) => {
  return (
    <View style={styles.spacer2}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    spacer0: {
        margin: 2,
    },
  spacer: {
    margin: 15,
  },
  spacer1: {
    margin: 5,
  },
  spacer2: {
    margin: 10,
  },
});
// export default Spacer;
