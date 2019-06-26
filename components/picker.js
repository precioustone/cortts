import React from 'react';
import { Picker, StyleSheet,Text, View } from 'react-native';


const CustomPicker = (props) => {

    appendItems = props.items.map( (val, index) => {
        try{
            return <Picker.item key={index} value={val} label={val} />
        } catch(err){
            console.log(err)
        }
    });

    return (
        <View style={{...styles.container,...props.containerStyle}}>
           
            <Text style={{...styles.label,...props.labelStyle}}>{props.label}</Text>
            
            <View style={{...styles.picker,...props.viewStyle}}> 
            <Picker
                selectedValue={props.val}
                style={{height: 50, width: '100%',}}
                onValueChange={(itemValue, itemIndex) => { console.log(itemValue+' '+itemIndex)}}>
                {appendItems}
            </Picker>
            </View>
        </View>
    );
};

export default CustomPicker;

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