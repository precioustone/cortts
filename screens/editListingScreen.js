import React, { Component } from 'react';
import { Alert,StyleSheet, ScrollView, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { CheckBox } from 'react-native-elements';

import Header from '../components/customHeader';
import CustomPicker from '../components/picker';
import { CustomInputWithLabel, CustomInputWithSide } from '../components/textInputs';
import { ButtonThickStr } from '../components/button';
import AppendableList from '../components/appendableList';



export default class EditListing extends Component{

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {

        await Font.loadAsync({
            'gotham-light': require('../assets/fonts/GothamMedium.ttf'),
          });
      
        this.setState({ fontLoaded: true });
    }

    state = {
        fontLoaded: false,  
        property: '',
        category: '',
        section: '',
        pType: '',
        price: '',
        service: '',
        caution: '',
        beds: '',
        baths: '',
        park: '',
        sizeOfLand: '',
        location: '',
        nbp: '',
        landTitle: '',
        leaseTerm: '',
        cortts: false,
        npc: false,
        commercial: false,
        propFloor: '',
        totalFloor: '',
        link: '',
        linkContact: '',
        agents: '',
        fullDesc: '',
        remark: '',
        features: [],
        feature: ''
    };

    handleClick = () => {
        const { navigate } = this.props.navigation;
        navigate('Photos', {details: this.state});
    };

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

    render(){

        const { navigate } = this.props.navigation;

        return (
            this.state.fontLoaded ? (
            <View style={{ flex: 1 }}>
            
                <Header
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={'EDIT PROPERTY'}
                    initials='AE'
                    style={{fontFamily: 'gotham-light'}}
                />
                <ScrollView>
                    <View style={styles.container}>

                        <CustomInputWithLabel
                            label='Property Description/Units:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (property) => this.setState({property}) , style: styles.inputStyle, multiline: true, value: this.state.property}}
                        />
                        <CustomPicker 
                            label='Category:'
                            labelStyle={styles.label}
                            containerStyle={{width: '100%'}}
                            items={['Commercial', 'Residential']}
                            val={this.state.category}
                        />

                        <CustomPicker 
                            label='Section:'
                            labelStyle={styles.label}
                            containerStyle={{width: '100%'}}
                            items={['Lease', 'Sale', 'Joint venture', 'Short-let', 'Business for Sale']}
                            val={this.state.section}
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
                        />
                        <CustomPicker 
                            label='No. of Bath(s):'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.baths}
                        />
                        <CustomPicker 
                            label='Unit(s) of car park:'
                            labelStyle={styles.label}
                            containerStyle={{}}
                            items={['1', '2', '3', '4', '5', '6', '7']}
                            val={this.state.park}
                        />
                        </View>
                        <CustomInputWithSide
                            label='Size of Land:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (sizeOfLand) => this.setState({sizeOfLand}) , style: styles.inputStyle, placeholder: '0.00', value: this.state.sizeOfLand}}
                            left='Sqm'
                        />
                        <CustomInputWithLabel
                            label='Location Address:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (location) => this.setState({location}) , style: styles.inputStyle, multiline: true, value: this.state.location}}
                        />
                        <CustomInputWithLabel
                            label='Near By Places:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (nbp) => this.setState({nbp}) , style: styles.inputStyle, multiline: true, value: this.state.nbp}}
                        />
                        <CustomInputWithLabel
                            label='Title of Land:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (landTitle) => this.setState({landTitle}) , style: styles.inputStyle, value: this.state.landTitle}}
                        />
                        <CustomInputWithLabel
                            label='Unexpected Lease Term:'
                            labelStyle={styles.label}
                            inputs={{onChangeText: (leaseTerm) => this.setState({leaseTerm}) , style: styles.inputStyle, multiline: true, value: this.state.leaseTerm}}
                        />
                        <View>
                            <Text style={styles.label}></Text>
                            <View style={styles.threeInputsView}>
                                <CheckBox 
                                    title='Cortts'
                                    checked={this.state.cortts}
                                    onPress={ () => this.setState({cortts: !this.state.cortts}) }
                                />
                                <CheckBox 
                                    title='NPC'
                                    checked={this.state.npc}
                                    onPress={ () => this.setState({npc: !this.state.npc}) }
                                />
                                <CheckBox 
                                    title='Commercial'
                                    checked={this.state.commercial}
                                    onPress={ () => this.setState({commercial: !this.state.commercial}) }
                                />
                                
                            </View>
                        </View>
                        <View style={styles.threeInputsView}>
                            <CustomPicker 
                                label='Property Floor:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['1', '2', '3', '4', '5', '6', '7']}
                                val={this.state.propFloor}
                            />
                            <CustomPicker 
                                label='Total Floor of property:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['1', '2', '3', '4', '5', '6', '7']}
                                val={this.state.totalFloor}
                            />
                            </View>
                            <CustomPicker 
                                label='Link:'
                                labelStyle={styles.label}
                                containerStyle={{}}
                                items={['Owner', 'Developer', 'Lawyer', 'Agent',]}
                                val={this.state.link}
                            />
                            <CustomInputWithLabel
                                label='Link Contact:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, value: this.state.linkContact}}
                            />
                            <CustomInputWithLabel
                                label='Cortts Agent:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, multiline: true, value: this.state.agents}}
                            />
                            <CustomInputWithLabel
                                label='Full Property Description:'
                                labelStyle={styles.label}
                                inputs={{style: styles.inputStyle, multiline: true, value: this.state.fullDesc}}
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
            </View>) : null
        );
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    label: {
        fontFamily: 'gotham-light',
        color: '#737373',
    },
    inputStyle: {
        width: '100%', 
        fontFamily: 'gotham-light',
    },
    threeInputsView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        color: '#fff', 
        padding: 10,
        fontFamily: 'gotham-light',
    },
});