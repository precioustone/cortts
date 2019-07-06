import React, { Component } from 'react';
import { Alert, Image, Modal, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
            images: null,
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

renderItem(item) {
    return (
        <TouchableOpacity  
                 style={{flex:1/3, //here you can use flex:1 also
                 aspectRatio:1}}>
                <Image style={{flex: 1}} resizeMode='cover' source={{ uri:  item.file}}></Image>
        </TouchableOpacity>
    )
}

    render() {
        let { images } = this.state;
        {/*let renderImages = images.map((value,index) => {
            return <Image source={{uri: value.file}} style={styles.image} />
        });*/}
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={30} callback={this.imageBrowserCallback}/>);
        }
        return (
            <View style={styles.container}>

                { this.renderModal() }
                <View style={styles.renderImage}>
                    {this.state.images ? (<FlatList
                        numColumns={3}
                        data={this.state.images}
                        renderItem={({ item }) => this.renderItem(item)}
                    />):
                         (<TouchableOpacity onPress={this.handleClick}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, width: '100%'}}>
                            <Ionicons name='ios-camera' size={50} />
                            <Text>UploadPhotos</Text>
                        </View>
                    </TouchableOpacity>)
                    }
                </View>
                <View style={{ width: '100%', paddingVertical: 20, backgroundColor: '#fff'}}>
                    <ButtonThickStr 
                        onClick={() => this.props.navigation.navigate('List')}
                        text= 'Skip'
                        style={styles.button}
                        containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                    />
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    renderImage: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 20,
    },
    button: {
        color: '#fff', 
        padding: 10,
        fontFamily: 'gotham-medium',
    },
});