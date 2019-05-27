import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';



export default class LoadingModalComponent extends React.Component {

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isLoading}
                onRequestClose={() => console.log('Closed')}>
                <View style={styles.container}>

                    <View style={styles.loadingBox}>
                        <ActivityIndicator size="large" color="#E0358E"/>
                    </View>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(43, 43, 56, 0.33)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingBox: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B2B38',
        borderRadius: 5,
        elevation: 5,
        width: 150,
        height: 100
    }


});
