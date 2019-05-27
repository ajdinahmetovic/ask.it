import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';



export default class LoadingComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                    <ActivityIndicator size="large" color="#E0358E"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
        alignItems: 'center',
        justifyContent: 'center'
    },

});
