import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonTrans = (props) => {
    return (
        <TouchableOpacity style={styles.touchable} disabled={props.disabled ? props.disabled : false} onPress={props.onClick}>
            <View style={{...styles.transView, ...props.containerStyle}}>
                <Text style={props.style}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ButtonThick = (props) => {
    return (
        <TouchableOpacity style={styles.touchable} disabled={props.disabled ? props.disabled : false} onPress={props.onClick}>
            <View style={{...styles.thickView, ...props.containerStyle}}>
                <Text style={props.style}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ButtonWithIcon = (props) => {
    return (
        <TouchableOpacity style={styles.touchableTwo} disabled={props.disabled ? props.disabled : false} onPress={props.onClick}>
            <View style={{...styles.bWithIcon, ...props.containerStyle}}>
                {props.icon}
                {props.text}
            </View>
        </TouchableOpacity>
    );
}

const ButtonThickStr = (props) => {
    return (
        <TouchableOpacity style={styles.touchable} disabled={props.disabled ? props.disabled : false} onPress={props.onClick}>
            <View style={{...styles.thickViewTwo, ...props.containerStyle}}>
                <Text style={props.style}>{props.text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export { ButtonThick, ButtonThickStr, ButtonTrans, ButtonWithIcon }; 

const styles = StyleSheet.create({
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 1,
        borderRadius: 10,
        width: '100%',
    },
    touchableTwo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    thickView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    thickViewTwo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    transView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    bWithIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
    },
});