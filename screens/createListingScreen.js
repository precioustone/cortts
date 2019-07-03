import React, { Component } from 'react';
import { Alert,StyleSheet, ScrollView, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';

import Header from '../components/customHeader';
import CustomPicker from '../components/picker';
import { CustomInputWithLabel, CustomInputWithSide } from '../components/textInputs';
import { ButtonThickStr } from '../components/button';
import AppendableList from '../components/appendableList';
import { addPropFmDb} from '../db/database';
import { addProp } from '../redux/actions';



class CreateListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-medium': require('../assets/fonts/GothamMedium.ttf'),
          });
      
        this.setState({ fontLoaded: true });
    }

    state = {
        error: null,
        modalVisible: false,
        fontLoaded: false,  
        title: '',
        area: '',
        category: '',
        section: '',
        p_type: '',
        price: '',
        service: '',
        caution: '',
        beds: '',
        baths: '',
        park: '',
        land_size: '',
        location: '',
        near_place: '',
        p_title: '',
        lease_term: '',
        e_platform: {cortts: false, npc: false, commercial: false},
        avail_floor: '',
        floor: '',
        linkToProp: '',
        link_contact: '',
        cortts_agent: '',
        prop_desc: '',
        remark: '',
        features: [],
        feature: '',
        added_date: '',
        prop_size: '',
        com_status: '',
    };

    handleClick = () => {
        const { navigate } = this.props.navigation;
        this.setState({modalVisible: !modalVisible});
        addPropFmDb(this.state, this.props.addProp, navigate, this.onError);
        //navigate('Photos', {details: this.state});
    };

    onError = (response) => {
        this.setState({modalVisible: !modalVisible});
        this.setState({error: response});
        showMessage({
            message: response,
            type: "error",
        });
    }
    
    onValueChange = (id,item) => {
        this.setState({id: item});
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
        console.log('deleted '+ key);
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


    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded ? (
            <View style={{ flex: 1 }}>
                { this.renderModal() }
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={'ADD NEW PROPERTY'}
                    initials='AE'
                    style={{fontFamily: 'gotham-medium'}}
                />
                <ScrollView>
                    <View style={styles.container}>

                        <CustomInputWithLabel
                            label='Property Description/Units:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (title) => this.setState({title}) , style: styles.inputStyle, multiline: true, value: this.state.property}}
                        />
                        <CustomPicker 
                            label='Category:'
                            labelStyle={styles.label}
                            containerStyle={{width: '100%'}}
                            items={['Commercial', 'Residential']}
                            val={this.state.category}
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('category',itemValue)}}
                        />

                        <CustomPicker 
                            label='Section:'
                            labelStyle={styles.label}
                            containerStyle={{width: '100%'}}
                            items={['Lease', 'Sale', 'Joint venture', 'Short-let', 'Business for Sale']}
                            val={this.state.section}
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('section',itemValue)}}
                        />

                        <CustomInputWithLabel
                            label='Property type:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (pType) => this.setState({pType}) , style: styles.inputStyle, value: this.state.pType}}
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
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('beds',itemValue)}}
                        />
                        <CustomPicker 
                            label='No. of Bath(s):'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.baths}
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('baths',itemValue)}}
                        />
                        <CustomPicker 
                            label='Unit(s) of car park:'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.park}
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('park',itemValue)}}
                        />
                        </View>
                        <CustomInputWithSide
                            label='Land Size:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (land_size) => this.setState({land_size}) , style: styles.inputStyle, placeholder: '0.00', value: this.state.land_size}}
                            left='Sqm'
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('land_size',itemValue)}}
                        />
                        <CustomInputWithSide
                            label='Property Size:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (prop_size) => this.setState({prop_size}) , style: styles.inputStyle, placeholder: '0.00', value: this.state.prop_size}}
                            left='Sqm'
                            onValueChange={(itemValue, itemIndex) => {this.onValueChange('prop_size',itemValue)}}
                        />
                        <CustomInputWithLabel
                            label='Area:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (area) => this.setState({area}) , style: styles.inputStyle, multiline: true, value: this.state.area}}
                        />
                        <CustomInputWithLabel
                            label='Street Address:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (location) => this.setState({location}) , style: styles.inputStyle, multiline: true, value: this.state.location}}
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
                                    onPress={ () => this.setState({cortts: !this.state.e_platform.cortts}) }
                                />
                                <CheckBox 
                                    title='NPC'
                                    checked={this.state.e_platform.npc}
                                    onPress={ () => this.setState({npc: !this.state.e_platform.npc}) }
                                />
                                <CheckBox 
                                    title='Commercial'
                                    checked={this.state.e_platform.commercial}
                                    onPress={ () => this.setState({commercial: !this.state.e_platform.commercial}) }
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
                                onValueChange={(itemValue, itemIndex) => {this.onValueChange('avail_floor',itemValue)}}
                            />
                            <CustomPicker 
                                label='Total Floor of Building:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['1', '2', '3', '4', '5', '6', '7']}
                                val={this.state.floor}
                                onValueChange={(itemValue, itemIndex) => {this.onValueChange('floor',itemValue)}}
                            />
                            </View>
                            <CustomPicker 
                                label='Link:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['Owner', 'Developer', 'Lawyer', 'Agent',]}
                                val={this.state.linkToProp}
                                onValueChange={(itemValue, itemIndex) => {this.onValueChange('linkToProp',itemValue)}}
                            />
                            <CustomInputWithLabel
                                label='Link Contact:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, value: this.state.link_contact}}
                            />
                            <CustomInputWithLabel
                                label='Cortts Agent:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, multiline: true, value: this.state.cortts_agent}}
                            />
                            <CustomInputWithLabel
                                label='Completion Status:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, multiline: true, value: this.state.com_status, placeholder: 'completed or date'}}
                            />
                            <CustomInputWithLabel
                                label='Full Property Description:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, multiline: true, value: this.state.prop_desc}}
                            />
                            <CustomInputWithLabel
                                label='Remark:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, multiline: true, value: this.state.remark}}
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
                                onClick={this.handleClick}
                                text= 'NEXT'
                                style={styles.button}
                                containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                            />
                        </View>
                </ScrollView>
                <FlashMessage position='top' animated={true} />
            </View>) : null
        );
    };
}

export default connect(null,{addProp})(CreateListing);

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    label: {
        fontFamily: 'gotham-medium',
        color: '#737373',
    },
    inputStyle: {
        width: '100%', 
        fontFamily: 'gotham-medium',
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