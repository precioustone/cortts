import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from 'react-native';

const CustomInput = (props) => {
    return (
        <KeyboardAvoidingView enabled style={styles.textView}>
            <TextInput 
                {...props}
            />
        </KeyboardAvoidingView>
    );
};

export const CustomInputWithLabel = (props) => {
    return (
        <KeyboardAvoidingView enabled style={styles.container}>
            
            <Text style={{...styles.text,...props.labelStyle}}>{props.label}</Text>
           
            <KeyboardAvoidingView enabled style={styles.textView}>
                <TextInput 
                    {...props.inputs}
                />
            </KeyboardAvoidingView>
        </KeyboardAvoidingView>
    );
};

export const CustomInputWithSide = (props) => {
    return (
        <KeyboardAvoidingView enabled style={styles.container}>
            
            <Text style={{...styles.text,...props.labelStyle}}>{props.label}</Text>
           <KeyboardAvoidingView style={{flexDirection: 'row', ...styles.textView}}>
                <KeyboardAvoidingView enabled style={{flex: 8}}>
                        <TextInput 
                            {...props.inputs}
                        />
                </KeyboardAvoidingView>
                <Text style={{flex: 2, color: '#737373'}}>{props.left}</Text>
           </KeyboardAvoidingView>
        </KeyboardAvoidingView>
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
        fontFamily: 'raleway-bold',
        paddingBottom: 10,
    },
});