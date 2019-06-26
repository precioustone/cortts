import React, { Component } from 'react';
import { CameraRoll, StyleSheet, ScrollView, Text, View } from 'react-native';
import * as Font  from 'expo-font';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import ActionButton from 'react-native-action-button';
import { Ionicons, Zocial } from '@expo/vector-icons';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';


import Header from '../components/customHeader';
import { properties } from '../store/store';
import { Template } from '../template/template';





export default class ViewListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-medium': require('../assets/fonts/GothamMedium.ttf'),
            'gotham-light': require('../assets/fonts/GothamLight.ttf'),
          });
      
        this.setState({ fontLoaded: true, property: properties[this.state.id] });
    }

    

    createPdf = async () => {
        const html = Template(this.state.property);
        
        let pdf = await Print.printToFileAsync({ html }).catch( (err) => console.log(err) );
        CameraRoll.saveToCameraRoll(pdf.uri);
        showMessage({
            message: "Saved as pdf successfully",
            type: "success",
        });
        
    }

    printDirect = async () => {
        const html = Template(this.state.property);
        await Print.printAsync({ html }).catch ( err => console.log(err))       
    }

    state = {
        fontLoaded: false,
        Property: {},
        id: this.props.navigation.getParam('id')
    };

    initialFunction = () => {
        const { navigate } = this.props.navigation;
        navigate('Profile');
    };

    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded && ( <View style={styles.container}>
            
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={this.state.property['title']}
                    initials='AE'
                    style={{fontFamily: 'gotham-medium'}}
                />
            
                <ScrollView  >
                    <View style={styles.container}>
                        <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', padding: 15}}>
                            <Text style={{...styles.header, color: '#03C06A'}}>{this.state.property['date']}</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Property Description/Units:</Text>
                            <Text style={styles.value}>{ this.state.property.title }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Category:</Text>
                                <Text style={styles.value}>{ this.state.property.category }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Section:</Text>
                                <Text style={styles.value}>{ this.state.property.section }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Property Type:</Text>
                            <Text style={styles.value}>{ this.state.property.pType }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Price:</Text>
                                <Text style={styles.value}>{ this.state.property.price }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Service Charge:</Text>
                                <Text style={styles.value}>{ this.state.property.service }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Caution:</Text>
                                <Text style={styles.value}>{ this.state.property.caution }</Text>
                            </View>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>No. of Bed(s):</Text>
                                <Text style={styles.value}>{ this.state.property.beds }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>No. of Bath(s):</Text>
                                <Text style={styles.value}>{ this.state.property.baths }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Car park:</Text>
                                <Text style={styles.value}>{ this.state.property.park }</Text>
                            </View>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Land Size:</Text>
                                <Text style={styles.value}>{ this.state.property.landSize }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Property Size:</Text>
                                <Text style={styles.value}>{ this.state.property.propSize }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Location Address:</Text>
                            <Text style={styles.value}>{ this.state.property.location }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Nearby Places:</Text>
                            <Text style={styles.value}>{ this.state.property.nearPlace }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Completion Status:</Text>
                                <Text style={styles.value}>{ this.state.property.status }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Title:</Text>
                                <Text style={styles.value}>{ this.state.property.pTitle }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Unexpired Lease Term:</Text>
                            <Text style={styles.value}>{ this.state.property.leaseTerm }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>E-Platform:</Text>
                            <Text style={styles.value}>{ this.state.property.ePlatform }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>No of Floors:</Text>
                                <Text style={styles.value}>{ this.state.property.floor }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Available Floor:</Text>
                                <Text style={styles.value}>{ this.state.property.availFloor }</Text>
                            </View>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Link:</Text>
                                <Text style={styles.value}>{ this.state.property.link }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Link Contact:</Text>
                                <Text style={styles.value}>{ this.state.property.linkContact }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Cortts Agent:</Text>
                                <Text style={styles.value}>{ this.state.property.corttsAgent }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Features:</Text>
                            <Text style={styles.value}>{ this.state.property.features }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Property Description:</Text>
                            <Text style={styles.value}>{ this.state.property.desc }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Remark:</Text>
                            <Text style={styles.value}>{ this.state.property.remark }</Text>
                        </View>
                    </View>
                </ScrollView>
                <ActionButton buttonColor="#26B469">
                    <ActionButton.Item buttonColor='#9b59b6' title="Edit" onPress={() => this.props.navigation.navigate('Edit', { 'id': this.state.id, })}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Save As pdf" onPress={ this.createPdf }>
                        <Zocial name="acrobat" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Print" onPress={ this.printDirect }>
                        <Ionicons name="md-print" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
                <FlashMessage position='top' animated={true} />
            </View>)
        );
    };
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#fff',
    },
    header: {
        fontFamily: 'gotham-medium',
        paddingVertical: 10,
    },
    value: {
        fontFamily: 'gotham-light',
        lineHeight: 20,
    },
    contView: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 20,
        width: '100%',
    },
    contMultView: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    insideView: {
        
    }
});