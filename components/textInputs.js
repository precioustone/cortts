import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input } from 'react-native-elements';


const CustomInput = (props) => {
    return (
        
        <TextInput 
            {...props}
        />
        
    );
};

export const CustomInputWithLabel = (props) => {
    return (
        <KeyboardAvoidingView enabled style={styles.container}>
            <Text style={{...styles.text,...props.labelStyle}}>{props.label}</Text>
            <TextInput 
                {...props.inputs}
            />
        </KeyboardAvoidingView>
    );
};

export const CustomInputWithSide = (props) => {
    return (
        <KeyboardAvoidingView enabled style={styles.container}>
            
            <Text style={{...styles.text,...props.labelStyle}}>{props.label}</Text>
           <Input 
                {...props.inputs}
           />
        </KeyboardAvoidingView>
    );
};

export const SearchBar = (props) => {
    return (
        <View enabled style={{...styles.container,flexDirection: 'row',}}>
            
            <Ionicons name='ios-arrow-round-back' onPress={props.onCancel} style={{color: '#26B469'}} />
          
            <KeyboardAvoidingView enabled style={{flex: 8, width: '100%'}}>
                    <TextInput 
                        {...props.inputs}
                    />
            </KeyboardAvoidingView>

            <Ionicons name='ios-close' onPress={props.onClear} />

        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 10,
    },
    textView: {
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        borderColor: '#C0C0C0',
        borderRadius: 3,
        borderWidth: 1,
        padding: 15,
        marginTop: 10,
        marginBottom:10, 
    },
    textInput: {
        flex: 1,
        width: '100%'
    },
    text: {
        fontFamily: 'gotham-medium',
        paddingBottom: 10,
    },
});