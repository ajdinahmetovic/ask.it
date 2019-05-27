import React from 'react';
import {StyleSheet, View, ActivityIndicator, Modal, AsyncStorage, Alert} from 'react-native';
import {setToken, setUserData} from "../../redux/app-redux";
import {connect} from "react-redux";


const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (userInfo) => {dispatch(setUserData(userInfo))},
    };
};

class AuthLoadingComponent extends React.Component {

    constructor(props){
        super(props);
        this.checkForUser()
    }

    render() {
        return (
            <Expo.AppLoading/>
        );
    }

    async checkForUser (){
        try {
            let userInfo = await AsyncStorage.getItem('USER');
            if (userInfo != null) {
                this.props.setUserData(JSON.parse(userInfo));
                this.props.navigation.navigate('AppStack');
            } else if(userInfo == null){
                this.props.navigation.navigate('AuthStack');
            }
        } catch (e) {
            console.log(e);
            Alert.alert(
                'Error', e,
                [
                    {text: 'Try again', style: 'cancel'},
                ],
                { cancelable: true }
            )
        }
    }
}

export default connect(null, mapDispatchToProps)(AuthLoadingComponent);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#2B2B38',
        alignItems: 'center',
        justifyContent: 'center'
    },

});
