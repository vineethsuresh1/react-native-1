import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';

import base64 from 'base-64';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            username: " ",
            password: " ",
            token: " "
        }
    }
        onLoginPressed() {
            fetch('https://mysqlcs639.cs.wisc.edu/login/', { 
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64.encode(`${this.state.username}:${this.state.password}`)}`
                }
            })
            .then(response => response.json())
            .then(data => {
                this.setState({token: data})
                console.log(data)
                this.props.navigation.navigate('profileScreen',
                    {username:this.state.username, token:data})
            })
        
            .catch(error => console.error(error));
        }
        render() {  
            return (  
                <View>
                    <TextInput  onChangeText={(val) =>  this.setState({username: val})} placeholder = "UserName:"
                    placeholderTextColor = "green"/>
                    <TextInput  onChangeText={(val) =>  this.setState({password: val})} placeholder = "Password:"
                    placeholderTextColor = "green"  secureTextEntry = {true}/>
                    <TouchableOpacity onPress = {this.onLoginPressed.bind(this)}>
                        <Text>Login</Text>
                    </TouchableOpacity>
                    <Text>Don't Have an Account</Text>
                    <Button title = "Sign Up" color = "green" onPress = {() => this.props.navigation.navigate('signScreen')}/>
                </View>
            );
        }
    }
 
export default Login;