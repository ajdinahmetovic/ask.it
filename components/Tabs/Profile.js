import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Dimensions } from 'react-native'


const width = Dimensions.get('window').width;

export default class Profile extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
           <View style={styles.container}>


           </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#2B2B38'
  }
});
