import React,{Component} from'react';
import {View, Text} from 'react-native';

export default class Detail extends Component{

    constructor(props){
        super(props);
        this.state = { 
           // username:this.props.navigation.state.params.data.user.Username ,
            //password:this.props.navigation.state.params.data.user.Password,
        };
    }
    render(){
        var state   = this.props.navigation.state;
        return(
            <View>
                <Text>{state.params.abc.make}</Text>
                <Text>{state.params.abc.model}</Text>
                <Text>{state.params.abc.midels}</Text>
                <Text>{state.params.abc.carID}</Text>
            </View>
        );
    }
}