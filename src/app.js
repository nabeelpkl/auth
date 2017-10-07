import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component { 
    state = { loggedIn: null };
    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyD3FO4rLYrQ2GMGUnuDpFZuZRTpaRvXVWg',
            authDomain: 'auth-df7a4.firebaseapp.com',
            databaseURL: 'https://auth-df7a4.firebaseio.com',
            projectId: 'auth-df7a4',
            storageBucket: 'auth-df7a4.appspot.com',
            messagingSenderId: '606442289944'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })                
            }
        });
    }

    renderContent() {

        switch(this.state.loggedIn) {
            case true:
                return (
                    <View style={{flexDirection: 'row'}}>
                        <Button onPress={ () => firebase.auth().signOut()}>Log out</Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style={{ marginTop: 25}}>
                        <Spinner size="large" />
                    </View>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/> 
                {this.renderContent()}
            </View>
        );
    }
}

export default App;