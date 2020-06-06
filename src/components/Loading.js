import React from 'react';
import {View,StyleSheet,ActivityIndicator} from 'react-native';

const Loading = () => {
    return(<View style={styles.loading}>
            <ActivityIndicator/>
        </View>

    );
};

const styles=StyleSheet.create({
    loading:{
        height:'100%',
        justifyContent:'center'
    }
});

export default Loading;