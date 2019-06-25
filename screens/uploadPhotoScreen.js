import React, { Component } from 'react';
import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ButtonThickStr } from '../components/button';
import ImageBrowser from '../components/ImageBrowser';

export default class UploadPhotos extends Component{

    static navigationOptions = {
       title: 'SELECT IMAGES',
    };

    constructor(props){
        super(props);
        this.state = {
            property: props.details,
            images: [],
            modalVisible: false,
            imageBrowserOpen: false,
        };
    }

    handleClick = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    };

    pickImage = () => this.setState({imageBrowserOpen: true, modalVisible: !this.state.modalVisible});

    imageBrowserCallback = (callback) => {
        callback.then((images) => {
          console.log(images)
          this.setState({
            imageBrowserOpen: false,
            images
          })
        }).catch((e) => console.log(e))
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
                backgroundColor: '#E2F0FF',
                borderWidth: 1,
                borderColor: '#E2F0FF',
                borderRadius: 3,}}>
                
                <TouchableOpacity 
                    style={{marginVertical: 15}}
                    onPress={() => Alert.alert('Camera')}>
                    <View>
                        <Text>Take picture</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{marginVertical: 15}}
                    onPress={this.pickImage}>
                    <View>
                        <Text>Select from Galery</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>);

    render() {
        let { images } = this.state;
        let renderImages = images.map((value,index) => {
            return <Image source={{uri: value.file}} style={styles.image} />
        });
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={30} callback={this.imageBrowserCallback}/>);
        }
        return (
            <ScrollView>
                <View style={styles.container}>

                    { this.renderModal() }
                    <View style={styles.renderImage}>
                        { renderImages }
                    </View>
                    
                    <ButtonThickStr 
                        onClick={this.handleClick}
                        text= 'SELECT IMAGES'
                        style={styles.button}
                        containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                    />
                </View>
            </ScrollView>  
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    renderImage: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
    button: {
        color: '#fff', 
        padding: 10,
        fontFamily: 'gotham-light',
    },
});