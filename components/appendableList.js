import React, { Component } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CustomInput from '../components/textInputs';


export const Badge = (props) => {
    return (
        <TouchableOpacity style={styles.badge} onPress={() => props.onPress(props.val)}>
            <View style={styles.badgeView}>
                <Text style={styles.badgeText}>{ props.text }</Text>
                <Ionicons style={{...styles.badgeText, paddingLeft: 10}}  name='ios-close' size={24} />
            </View>
        </TouchableOpacity>
    );
};

const AppendableList = (props) => {


    let appendBadge = props.features.map( (value, index) => {
            return <Badge 
                    text={value}
                    val={index}
                    key={index}
                    onPress={ props.delete }
                />
    });

    return (
        <View>
            <View style={{ alignItems: 'flex-start', justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap'}}>
                { appendBadge }
            </View>

            <CustomInput 
                placeholder= 'Features'
                onChangeText={props.onChangeText}
                value={props.feature}
                style={styles.text}
                onSubmitEditing={props.onSubmit}
            />
            <Button 
                onPress={props.onPress }
                title='add'
                disabled={(props.feature == '')}
            />
        </View>
    );
    
}

export default AppendableList;

const styles = StyleSheet.create({
    badge: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#D3D3D3',
        margin: 10,
    },
    badgeView: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#D3D3D3',
        backgroundColor: '#D3D3D3',
        flexDirection: 'row',
        padding: 10,
    },  
    badgeText: {
        color: "#545454"
    },
    text: {
        fontFamily: 'gotham-medium',
        width: '100%',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15,
        color: '#000000',
    },
});