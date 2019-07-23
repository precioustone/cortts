import React, { Component } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Modal, StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Font from 'expo-font';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Header from '../components/customHeader';
import CustomPicker from '../components/picker';
import { CustomInputWithLabel, CustomInputWithSide } from '../components/textInputs';
import { ButtonThickStr } from '../components/button';
import AppendableList from '../components/appendableList';
import { editPropFmDb} from '../db/database';
import { EDIT_MODE } from '../db/mode';
import { editProp } from '../redux/actions';
import { getPropById, getUser } from '../redux/selectors';




class EditListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-medium': require('../assets/fonts/GothamMedium.ttf'),
          });
    
          let features = this.state.features.split(',');
          this.setState({ fontLoaded: true, features});
          this.ePlatform(this.state.e_platform);
    }

    constructor(props){
        super(props);
        this.state = {
            mode: EDIT_MODE,
            fontLoaded: false,  
            ...this.props.property,
            feature: '',
            msg: null,
            modalVisible: false,
            status: false,
        };
    }

    ePlatform = (string) => {
        let plat = string.split(', ');
        let obj = {cortts: false, npc: false, commercial: false};
        for ( let value of plat){
            if ( value == 'Cortts Website')
                obj.cortts = true;
            else if (value == 'Nigerian Property Centre')
                obj.npc = true;
            else if (value == 'Commercial website')
                obj.commercial = true;
        }
        
        this.setState({e_platform: obj});

    }


    handleClick = () => {
       
        this.setState({ modalVisible: !this.state.modalVisible });
        let data = this.formatData(this.state);
        editPropFmDb(data, this.props.editProp, this.onSuccess, this.onError);
    
    };

    upLoadPhotos = () => {
        const { navigate } = this.props.navigation;
        
        navigate('Photos', {id: this.props.navigation.getParam('id'), title: this.state.title});
    };

    viewPhotos = () => {
        const { navigate } = this.props.navigation;
        
        navigate('ViewPhotos', {id: this.props.navigation.getParam('id'), title: this.state.title});
    };

    onError = (response, status) => {
        this.setState({modalVisible: false, msg: response, status});
        
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }

    onSuccess = (response, status) => {
        this.setState({modalVisible: false, msg: response, status});
        
        showMessage({
            message: this.state.msg,
            type: "success",
            autoHide: false,
        });
        
    }

    formatData = (data) => {
        let { features } = data;
        let { e_platform } = data;

        let platform = '';

        if (e_platform.cortts){
            platform = platform+'Cortts Website,';
        }
        if (e_platform.npc){
            platform = platform+' Nigerian Property Centre,';
        }
        if (e_platform.commercial){
            platform = platform+' Commercial website';
        }

        e_platform = platform;

        features = features.join(", ");

        let newData = {...data, features, e_platform};

        delete newData.msg;
        delete newData.fontLoaded;
        delete newData.status;
        delete newData.mode;
        delete newData.modalVisible;

        return newData;

    }
    

    initialFunction = () => {
        const { navigate } = this.props.navigation;
        navigate('Profile');
    };

    addFeatures = () => {
        let features = [ ...this.state.features, this.state.feature];
        this.setState({features, feature: ''});
    }

    deleteFeature = (key) =>{
        let features = this.state.features.filter((value,index) => index != key );
        this.setState({features})
    }

    renderModal = () => (<Modal animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={ 
            this.handleClick
        }>
        <View 
        style={{flex: 1, alignItems: 'center', 
        justifyContent:'center', backgroundColor: 'rgba(0,0,0,0.3)', padding: 30,}}>
            <View style={{
                padding: 15,
                width: '100%',
                }}>
                <ActivityIndicator />
            </View>
        </View>
    </Modal>);

    renderImagebutton = () => (
        <View style={{ flexDirection: "row", width: '100%', height: 50, justifyContent: 'center', alignItems: "center", marginBottom: 10}}>
            <TouchableOpacity style={{width: '50%', color: "#C5B8B8"}} onPress={ this.viewPhotos }>
                <View style={{ flexDirection: "row", padding: 10, backgroundColor: "#C5B8B8"}}>
                    <MaterialCommunityIcons 
                        name='image-multiple'
                        size={36}
                        style={{color: '#fff'}} 
                    />
                    <Text style={{color: '#fff', margin: 10}}>View Images</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{width: '50%', backgroundColor: "#2593A8"}} onPress={this.upLoadPhotos}>
                <View style={{ flexDirection: "row", padding: 10, color: "#2593A8"}}>
                    <MaterialCommunityIcons 
                        name='image-plus'
                        size={36}
                        style={{color: '#fff'}} 
                    />
                    <Text style={{color: '#fff', margin: 10}}>Add Images</Text>
                </View>
            </TouchableOpacity>
        </View>
    );


    render(){


        const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

        return (
            this.state.fontLoaded ? (
            <View style={{flex: 1}}>
                { this.renderModal() }
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={ this.state.title }
                    initials='AE'
                    style={{fontFamily: 'gotham-medium'}}
                />
                { this.renderImagebutton() } 
                
                <ScrollView>
                    <KeyboardAvoidingView style={styles.container} enabled={true} behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>

                        <CustomInputWithLabel
                            label='Property Description/Units:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (title) => this.setState({title}) , style: styles.inputStyle, multiline: true, value: this.state.title}}
                        />
                        <CustomPicker 
                            label='Category:'
                            labelStyle={styles.label}
                            containerStyle={{width: '100%'}}
                            items={['Commercial', 'Residential']}
                            val={this.state.category}
                            onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}
                        />

                        <CustomPicker 
                            label='Section:'
                            labelStyle={styles.label}
                            containerStyle={{width: '100%'}}
                            items={['Lease', 'Sale', 'Joint venture', 'Short-let', 'Business for Sale']}
                            val={this.state.section}
                            onValueChange={(itemValue, itemIndex) => this.setState({section: itemValue})}
                        />

                        <CustomInputWithLabel
                            label='Property type:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (p_type) => this.setState({p_type}) , style: styles.inputStyle, value: this.state.p_type}}
                        />

                        <CustomInputWithLabel
                            label='Price:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (price) => this.setState({price}) , style: styles.inputStyle, placeholder: '0.00', value: this.state.price}}
                        />

                        <CustomInputWithLabel
                            label='Service Charge:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (service) => this.setState({service}) , style: styles.inputStyle, placeholder: '0.00', value: this.state.service}}
                        />

                        <CustomInputWithLabel
                            label='Caution Fee:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (caution) => this.setState({caution}) , style: styles.inputStyle, placeholder: '0.00', value: this.state.caution}}
                        />

                        <View style={styles.threeInputsView}>
                        <CustomPicker 
                            label='No. of Bed(s):'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.beds}
                            onValueChange={(itemValue, itemIndex) => this.setState({beds: itemValue})}
                        />
                        <CustomPicker 
                            label='No. of Bath(s):'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.baths}
                            onValueChange={(itemValue, itemIndex) => this.setState({baths: itemValue})}
                        />
                        <CustomPicker 
                            label='Unit(s) of car park:'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.park}
                            onValueChange={(itemValue, itemIndex) => this.setState({park: itemValue})}
                        />
                        </View>
                        <CustomInputWithSide
                            label='Land Size:'
                            labelStyle={styles.label}
                            inputs={{
                                onChangeText: (land_size) => this.setState({land_size}) ,
                                //style: styles.inputStyle, 
                                value: this.state.land_size,
                                rightIcon: <Text>Sqm</Text>,
                                inputContainerStyle: styles.inputStyleWithSide,
                                containerStyle: {padding: 0}
                            }}
                        />
                        <CustomInputWithSide
                            label='Property Size:'
                            labelStyle={styles.label}
                            inputs={{
                                onChangeText: (prop_size) => this.setState({prop_size}) , //style: styles.inputStyle,  
                                value: this.state.prop_size,
                                rightIcon: <Text>Sqm</Text>,
                                inputContainerStyle: styles.inputStyleWithSide,
                                containerStyle: {padding: 0}
                            }}
                            left='Sqm'
                        />
                        <CustomInputWithLabel
                            label='Area:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (area) => this.setState({area}) , style: styles.inputStyle, multiline: true, value: this.state.area}}
                        />
                        <CustomInputWithLabel
                            label='Street Address:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (address) => this.setState({address}) , style: styles.inputStyle, multiline: true, value: this.state.address}}
                        />
                        <CustomInputWithLabel
                            label='Near By Places:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (near_place) => this.setState({near_place}) , style: styles.inputStyle, multiline: true, value: this.state.near_place}}
                        />
                        <CustomInputWithLabel
                            label='Title of Land:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (p_title) => this.setState({p_title}) , style: styles.inputStyle, value: this.state.p_title}}
                        />
                        <CustomInputWithLabel
                            label='Unexpected Lease Term:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (lease_term) => this.setState({lease_term}) , style: styles.inputStyle, multiline: true, value: this.state.lease_term}}
                        />
                        <View>
                            <Text style={styles.label}></Text>
                            <View style={styles.threeInputsView}>
                                <CheckBox 
                                    title='Cortts'
                                    checked={this.state.e_platform.cortts}
                                    onPress={ () => this.setState({e_platform: {...this.state.e_platform,cortts: !this.state.e_platform.cortts}}) }
                                />
                                <CheckBox 
                                    title='NPC'
                                    checked={this.state.e_platform.npc}
                                    onPress={ () => this.setState({e_platform: {...this.state.e_platform,npc: !this.state.e_platform.npc}}) }
                                />
                                <CheckBox 
                                    title='Commercial'
                                    checked={this.state.e_platform.commercial}
                                    onPress={ () => this.setState({e_platform: {...this.state.e_platform,commercial: !this.state.e_platform.commercial}}) }
                                />
                                
                            </View>
                        </View>
                        <View style={styles.threeInputsView}>
                            <CustomPicker 
                                label='Property Floor:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['1', '2', '3', '4', '5', '6', '7']}
                                val={this.state.avail_floor}
                                onValueChange={(itemValue, itemIndex) => this.setState({avail_floor:itemValue})}
                            />
                            <CustomPicker 
                                label='Total Floor of Building:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['1', '2', '3', '4', '5', '6', '7']}
                                val={this.state.total_floor}
                                onValueChange={(itemValue, itemIndex) => this.setState({total_floor: itemValue})}
                            />
                            </View>
                            <CustomPicker 
                                label='Link:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['Owner', 'Developer', 'Lawyer', 'Agent',]}
                                val={this.state.linkToProp}
                                onValueChange={(itemValue, itemIndex) => this.setState({linkToProp: itemValue})}
                            />
                            <CustomInputWithLabel
                                label='Link Contact:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, value: this.state.link_contact, onChangeText: (link_contact) => this.setState({link_contact})}}
                            />
                            <CustomInputWithLabel
                                label='Cortts Agent:'
                                labelStyle={styles.label}
                                inputs={{onChangeText: (cortts_agent) => this.setState({cortts_agent}), style: styles.inputStyle, multiline: true, value: this.state.cortts_agent}}
                            />
                            <CustomInputWithLabel
                                label='Completion Status:'
                                labelStyle={styles.label}
                                inputs={{onChangeText: (com_status) => this.setState({com_status}), style: styles.inputStyle, multiline: true, value: this.state.com_status, placeholder: 'completed or date'}}
                            />
                            <CustomInputWithLabel
                                label='Full Property Description:'
                                labelStyle={styles.label}
                                inputs={{onChangeText: (prop_desc) => this.setState({prop_desc}), style: styles.inputStyle, multiline: true, value: this.state.prop_desc}}
                            />
                            <CustomInputWithLabel
                                label='Remark:'
                                labelStyle={styles.label}
                                inputs={{onChangeText: (remark) => this.setState({remark}), style: styles.inputStyle, multiline: true, value: this.state.remark}}
                            />

                            <AppendableList
                                onChangeText={(feature) => this.setState({feature})}
                                feature={this.state.feature}
                                onPress={() => this.addFeatures()}
                                features={this.state.features}
                                delete={this.deleteFeature}
                                onSubmit={this.addFeatures}
                            />

                            <ButtonThickStr 
                                onClick={ this.state.status? () => this.props.navigation.navigate('List') :
                                this.handleClick}
                                text={ this.state.status? 'Done' : 'Submit'}
                                style={styles.button}
                                containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                            />
                        </KeyboardAvoidingView>
                </ScrollView>
                
            </View>) : null
        );
    };
}

const mapStateToProps = ( state, props ) => {
    return {userToken: getUser(state), property: getPropById(state, props.navigation.getParam('id'))};
}


export default connect(
mapStateToProps, {editProp})(EditListing)


const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center'
    },
    label: {
        fontFamily: 'gotham-medium',
        color: '#737373',
    },
    inputStyle: {
        width: '100%', 
        fontFamily: 'gotham-medium',
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginBottom: 15,
        color: '#000',
    },
    inputStyleWithSide: {
        
        borderColor: '#C0C0C0',
        borderWidth: 1,
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFF',
    },
    threeInputsView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        color: '#fff', 
        padding: 10,
        fontFamily: 'gotham-medium',
    },
});