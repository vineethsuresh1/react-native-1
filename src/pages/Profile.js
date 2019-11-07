import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button} from 'react-native';  

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        username: " ",                 
        password: " ",                 
        firstName:" ",                
        lastName: " ",                 
        goalDailyCalories: 0,      
        goalDailyProtein: 0,      
        goalDailyCarbohydrates:0 , 
        goalDailyFat: 0,           
        goalDailyActivity:0      
        }
    }
    componentDidMount(){
        fetch('https://mysqlcs639.cs.wisc.edu/users/' + this.props.navigation.state.params.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token':  this.props.navigation.state.params.token.token
            }
    })
    .then(response =>  {
        return response.json()
    })
    .then(data => {
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            goalDailyActivity: data.goalDailyActivity,
            goalDailyCalories: data.goalDailyCalories,
            goalDailyCarbohydrates: data.goalDailyCarbohydrates,
            goalDailyFat: data.goalDailyFat,
            goalDailyProtein: data.goalDailyProtein
        })
    })
    .catch(error=>console.log(error))
    }

    render() { 
        return (
        <View>
            <Text>FirstName: {this.state.firstName}</Text>
            <Text>LastName: {this.state.lastName}</Text>
            <Text>Username: {this.state.username}</Text>
            <Text>Daily Activity Goal: {this.state.goalDailyActivity}</Text>
            <Text>Daily Calorie Goal: {this.state.goalDailyCalories}</Text>
            <Text>Daily Carbohydrates Goal: {this.state.goalDailyCarbohydrates}</Text>
            <Text>Daily Fat Goal: {this.state.goalDailyFat}</Text>
            <Text>Daily Protein Goal: {this.state.goalDailyProtein}</Text>

        </View>
        );
    }
}
export default Profile;
           
