import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import AllAccidentList from '../../components/AllAccidentList';
import {Context} from '../../context/AuthContext';
import moment, {now} from 'moment';
import DonarList from '../../components/DonarList';

const Donar = ({navigation}) => {
    const {state, donarList} = useContext(Context);

    useEffect(() => {
        donarList(
            navigation.getParam('accidentUserBlood'),
            navigation.getParam('accidentUser'),
        );
    }, []);
    const accidentUser = navigation.getParam('accidentUser');
    const accidentUserBlood = navigation.getParam('accidentUserBlood');
    const accidentId = navigation.getParam('accidentId');

    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    marginVertical: 15,
                }}
            />
            <>
                {state.donarList == 0 ? (
                    <Text>Current No sutaible donar available</Text>
                ) : (
                    <ScrollView>
                        <DonarList
                            data={state.donarList}
                            navigation={navigation}
                            accident={accidentId}
                        />
                    </ScrollView>
                )}
            </>
        </>
    );
};

export default Donar;
