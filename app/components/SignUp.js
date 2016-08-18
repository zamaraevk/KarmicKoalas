'use strict'

import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TextInput, AlertIOS, AsyncStorage } from 'react-native';
import Main from './Main';

class SignUp extends Component {
	constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      username: '',
      password: ''
    }
  }

  signUp(){
		console.log('name: '+ this.state.name + '\nemail: '+ this.state.email + '\nusername: '+ this.state.username + '\npassword: '+ this.state.password);

				fetch("https://wegotoo.herokuapp.com/signup", {
				method: 'POST',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: this.state.name,
					email: this.state.email,
					username: this.state.username,
					password:  this.state.password,
				})
			}).then((response) => response.json()).then((responseData) => {
					console.log('DATA FROM SERVER', responseData)
					//update Asynch storage
					var id = '' + responseData.userId;
					AsyncStorage.setItem("userId", id);
					AsyncStorage.setItem('username',this.state.username)
					this.navToMain(responseData.userId)
			 }).done();
  }

	navToMain(id){
		//console.log('Username: ' + this.state.username + ' ID: ' + id);
		this.props.navigator.resetTo({
			navigationBarHidden: true,
			component: Main,
			title: "Main",
			passProps: {
        username: this.state.username,
				userId: id
      }
		});
	}

  render() {
		return (
      <View style={styles.container}>
				<Text style={styles.textHeader}>
					INSERT LOGO
				</Text>
        <TextInput
          style = {styles.inputText}
          returnKeyType = {"next"}
          autoFocus = {true}
          placeholder = "Name: "
          placeholderTextColor="#3498db"
          onChangeText={(text) => this.setState({name: text})}
          onSubmitEditing={(event) => {
            this.refs.SecondInput.focus();
          }}
        />
        <TextInput
          ref='SecondInput'
          style = {styles.inputText}
          placeholder="Email Address: "
          placeholderTextColor="#3498db"
          onChangeText={(text) => this.setState({email: text})}
          onSubmitEditing={(event) => {
            this.refs.ThirdInput.focus();
          }}
        />
				<TextInput
          ref='ThirdInput'
          style={styles.inputText}
          placeholder="Username: "
          placeholderTextColor="#3498db"
          onChangeText={(text) => this.setState({username: text})}
          onSubmitEditing={(event) => {
            this.refs.FourthInput.focus();
          }}
        />
        <TextInput
          ref='FourthInput'
          style={styles.inputText}
          placeholder="Password: "
          placeholderTextColor="#3498db"
          password={true}
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableHighlight onPress={() => this.signUp()} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
			</View>
			)
	}
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
    },
    text: {
      color: 'blue',
      backgroundColor: '#3498db',
      fontSize: 30,
      margin: 80
    },
		TextInput: {
			justifyContent: 'center',
			margin: 10
		},
    inputText: {
      height: 40,
      color: '#3498db',
			borderColor: "#3498db",
	    borderWidth: 1,
			padding: 30,
			alignItems: 'center'
    },
    textHeader: {
      fontSize: 30,
      color: '#3498db',
      justifyContent: 'flex-start'
    },
    buttonText: {
      fontSize: 20,
      color: 'white'
    },
    button: {
      height: 44,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'skyblue'
    }
});

module.exports =  SignUp;
