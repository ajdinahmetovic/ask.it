import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Dimensions, Modal } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';



const width = Dimensions.get('window').width;

export default class NewQuestion extends React.Component {

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <Modal>

                <View style={styles.container}>

                </View>



            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        width: '70%',
        height: '70%',
        backgroundColor: '#2B2B38'

    }


});
