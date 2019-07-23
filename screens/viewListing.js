import React, { Component } from 'react';
import { CameraRoll, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Font  from 'expo-font';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import ActionButton from 'react-native-action-button';
import { Ionicons, Zocial } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons'


import Header from '../components/customHeader';
import { Template } from '../template/template';
import { getPropById, getUser } from '../redux/selectors';





class ViewListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-medium': require('../assets/fonts/GothamMedium.ttf'),
            'gotham-light': require('../assets/fonts/GothamLight.ttf'),
          });
      
        this.setState({ fontLoaded: true });
    }

    constructor(props){
        super(props);

        this.state = {
            fontLoaded: false,
        };
    }   

    createPdf = async () => {
        const html = Template(this.props.property);
        
        let pdf = await Print.printToFileAsync({ html }).catch( (err) =>{
            showMessage({
                message: err,
                type: "danger",
            });
        });
        CameraRoll.saveToCameraRoll(pdf.uri);
        showMessage({
            message: "Saved as pdf successfully",
            type: "success",
        });
        
    }

    printDirect = async () => {
        const html = Template(this.props.property);
        await Print.printAsync({ html }).catch( (err) =>{
            showMessage({
                message: err,
                type: "danger",
            });
        });      
    }

    

    share = async () => {
        
        const html = Template(this.props.property);
        showMessage({
            message: "Please wait ..",
            type: "info",
        });
        let pdf = await Print.printToFileAsync({ html }).catch( (err) =>{
            showMessage({
                message: err,
                type: "danger",
            });
        });

        await Sharing.shareAsync(pdf.uri, { mimeType: 'application/pdf', dialogTitle:'Share Using '});
    };

    viewPhotos = () => {
        const { navigate } = this.props.navigation;
        
        navigate('ViewPhotos', {id: this.props.navigation.getParam('id'), title: this.props.property.title});
    };

    renderImagebutton = () => (
        <View style={{ flexDirection: "row", width: '100%', height: 50, justifyContent: 'center', alignItems: "center", marginBottom: 10}}>
            <TouchableOpacity style={{width: '100%', color: "#C5B8B8"}} onPress={ this.viewPhotos }>
                <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#C5B8B8", alignItems:"center", justifyContent:"center"}}>
                    <MaterialCommunityIcons 
                        name='image-multiple'
                        size={36}
                        style={{color: '#fff'}} 
                    />
                    <Text style={{color: '#fff', margin: 10}}>View Images</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    render(){
        return (
            this.state.fontLoaded && ( <View style={styles.container}>
            
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={this.props.property.title}
                    show={true}
                    onPress={() => this.share()}
                    style={{fontFamily: 'gotham-medium'}}
                />
                { this.renderImagebutton() } 
                <ScrollView  >
                    <View style={styles.container}>
                        <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end', padding: 15}}>
                            <Text style={{...styles.header, color: '#03C06A'}}>{this.props.property.added_date}</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Property Description/Units:</Text>
                            <Text style={styles.value}>{ this.props.property.title }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Category:</Text>
                                <Text style={styles.value}>{ this.props.property.category }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Section:</Text>
                                <Text style={styles.value}>{ this.props.property.section }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Property Type:</Text>
                            <Text style={styles.value}>{ this.props.property.p_type }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Price:</Text>
                                <Text style={styles.value}>{ this.props.property.price }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Service Charge:</Text>
                                <Text style={styles.value}>{ this.props.property.service }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Caution:</Text>
                                <Text style={styles.value}>{ this.props.property.caution }</Text>
                            </View>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>No. of Bed(s):</Text>
                                <Text style={styles.value}>{ this.props.property.beds }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>No. of Bath(s):</Text>
                                <Text style={styles.value}>{ this.props.property.baths }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Car park:</Text>
                                <Text style={styles.value}>{ this.props.property.park }</Text>
                            </View>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Land Size:</Text>
                                <Text style={styles.value}>{ this.props.property.land_size }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Property Size:</Text>
                                <Text style={styles.value}>{ this.props.property.prop_size }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Location Address:</Text>
                            <Text style={styles.value}>{ this.props.property.address }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Nearby Places:</Text>
                            <Text style={styles.value}>{ this.props.property.near_place }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Completion Status:</Text>
                                <Text style={styles.value}>{ this.props.property.com_status }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Title:</Text>
                                <Text style={styles.value}>{ this.props.property.p_title }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Unexpired Lease Term:</Text>
                            <Text style={styles.value}>{ this.props.property.lease_term }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>E-Platform:</Text>
                            <Text style={styles.value}>{ this.props.property.e_platform }</Text>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>No of Floors:</Text>
                                <Text style={styles.value}>{ this.props.property.total_floor }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Available Floor:</Text>
                                <Text style={styles.value}>{ this.props.property.avail_floor }</Text>
                            </View>
                        </View>
                        <View style={styles.contMultView}>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Link:</Text>
                                <Text style={styles.value}>{ this.props.property.linkToProp }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Link Contact:</Text>
                                <Text style={styles.value}>{ this.props.property.link_contact }</Text>
                            </View>
                            <View style={styles.insideView}>
                                <Text style={styles.header}>Cortts Agent:</Text>
                                <Text style={styles.value}>{ this.props.property.cortts_agent }</Text>
                            </View>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Features:</Text>
                            <Text style={styles.value}>{ this.props.property.features }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Property Description:</Text>
                            <Text style={styles.value}>{ this.props.property.prop_desc }</Text>
                        </View>
                        <View style={styles.contView}>
                            <Text style={styles.header}>Remark:</Text>
                            <Text style={styles.value}>{ this.props.property.remark }</Text>
                        </View>
                    </View>
                </ScrollView>
                <ActionButton buttonColor="#26B469">
                    <ActionButton.Item buttonColor='#9b59b6' title="Edit" onPress={() => this.props.navigation.navigate('Edit', { 'id': this.props.property.id, })}>
                        <Ionicons name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Save As pdf" onPress={ this.createPdf }>
                        <Zocial name="acrobat" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="Print" onPress={ this.printDirect }>
                        <Ionicons name="md-print" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>
               
            </View>)
        );
    };
}

const mapStateToProps = ( state, props ) => {
    return {userToken: getUser(state), property: getPropById(state,props.navigation.getParam('id'))};
}


export default connect(mapStateToProps, null)(ViewListing)


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