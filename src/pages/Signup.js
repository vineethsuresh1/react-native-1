import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            firstName: " ",
            lastName: " ",
            username: " ",
            password: " "
        }
    }

    loginNewUser() {
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
            console.log(data);
            this.props.navigation.navigate("profileScreen", 
                {user:this.state.username, token: data})
        })
    
        .catch(error => console.error(error));
    }

    async onRegisterPressed(){
             try{
                    let response = await fetch('https://mysqlcs639.cs.wisc.edu/users/' ,{
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                username: this.state.username,
                                password: this.state.password,
                            }
                        )
                    });
        
            let res =  await response.text();
            console.log(response);
            if (response.status == 409) {
                this.setState({errorCode: "Username is already taken"})
            } else if (response.status == 400) {
                this.setState({errorCode: "Password must be >= 5 characters"})
            } else if (response.status == 200) {
                response.json();
                this.loginNewUser();
            } else {
                let errors = res;
                throw errors;
            }
        } catch(errors) {
            console.log("Catch error is: " + errors);
        }

    }
    render() { 
        return (  
            <View>
                <TextInput  onChangeText={(val) =>  this.setState({firstName: val})} placeholder = "firstName"
                placeholderTextColor = "green"/>
                <TextInput  onChangeText={(val) =>  this.setState({lastName: val})} placeholder = "lastName"
                placeholderTextColor = "green"/>
                <TextInput  onChangeText={(val) =>  this.setState({username: val})} placeholder = "Username"
                placeholderTextColor = "green"/>
                <TextInput  onChangeText={(val) =>  this.setState({password: val})} placeholder = "Password:"
                placeholderTextColor = "green"  secureTextEntry = {true}/>
                <TouchableOpacity onPress = {this.onRegisterPressed.bind(this)}>
                    <Text>REGISTER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
 
export default Signup;