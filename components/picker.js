import React, { Component } from 'react';
import { Picker, StyleSheet,Text, View } from 'react-native';

export default class CustomPicker extends Component{

    constructor(props){
        super(props);

        this.state = {
            list: props.items
        };
    }

    itemList = () =>{
        return( this.state.list.map( (x,i) => { 
              return( <Picker.Item label={x} key={i} value={x}  />)} ));
    }

    render(){
        
        return (
            <View style={{...styles.container,...this.props.containerStyle}}>
            
                <Text style={{...styles.label,...this.props.labelStyle}}>{this.props.label}</Text>
                
                <View style={{...styles.picker,...this.props.viewStyle}}> 
                <Picker
                    selectedValue={this.props.val}
                    style={{height: 50, width: '100%',}}
                    onValueChange={this.props.onValueChange}>
                    {this.itemList()}
                </Picker>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    }, 
    label: {
        paddingBottom: 10,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        borderRadius: 3,
    },
});