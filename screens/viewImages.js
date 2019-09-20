import React, { Component } from 'react';
import { Alert, ActivityIndicator, Image, ImageBackground, Modal, FlatList, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import {downloadFile ,ExternalStorageDirectoryPath, writeFile, unlink, mkdir, readDir} from 'react-native-fs';
import {unzip, zip} from 'react-native-zip-archive';
import {showMessage} from 'react-native-flash-message';

import { getImagesById} from '../redux/selectors';
import { WhiteHeader } from '../components/customHeader';



class ViewPhotos extends Component{

    static navigationOptions = {
       //title: 'SELECT IMAGES',
       header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            msg: null,
            imageUrls: [],
            modalVisible: false,
            selected: {},
            extractDir: `${ExternalStorageDirectoryPath}/${this.props.navigation.getParam('images').split('/').pop(-1).split('.')[0]}`,
            zipFile: `${ExternalStorageDirectoryPath}/${this.props.navigation.getParam('images').split('/').pop(-1)}`,
            webUri: this.props.navigation.getParam('images'),
            downloading: false,
        };
    }

    

    componentDidMount(){
        //this.setState({downloading: true});
        this.requestStoragePermission();
    }

    downloadImages = () => {
        const downloadOption = {
            fromUrl: this.state.webUri,
            toFile: this.state.zipFile,
            begin: _ => this.setState({downloading: true})
        }
        
        writeFile(this.state.zipFile, "", 'base64')
        .then(_ =>{
            mkdir(this.state.extractDir)
            .then(_ => {
                if(this.state.webUri != '' && this.state.webUri != null){
                    downloadFile(downloadOption).promise
                    .then(result => {
                        if(result){  
                            unzip(this.state.zipFile, this.state.extractDir)
                            .then(_ => {
                                readDir(this.state.extractDir).then(files => {
                                    //this.onError(JSON.stringify(files));
                                    this.setState({imageUrls: files, downloading: false})
                                }).catch(err => {
                                    this.onError(err.message);
                                })
                            })
                            .catch(err => this.onError(err.message));
                        }
                    }).catch(err => {
                       this.onError(err.message);
                    })
                }
            })
            .catch(err => {
                this.onError(err.message);
            });
        })
        .catch(err => this.onError(err.message));
        
    }

    componentWillUnmount(){
        unlink(this.state.extractDir)
        .catch(err => {
            this.onError(err.message);
        });
        unlink(this.state.zipFile)
        .catch(err => {
            this.onError(err.message);
        });
    }

    requestStoragePermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]
          );
          if (granted['android.permission.READ_EXTERNAL_STORAGE']
          && granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
            this.downloadImages();
          } else {
            Alert.alert('Storage permission denied');
            this.setState({downloading: false});
          }
        } catch (err) {
            Alert.alert(err.message);
            this.setState({downloading: false});
        }
    }

    onError = (response) => {
        this.setState({msg: response});
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }

    handleBackPress = () => {
        this.setState({ modalVisible: false, selected: {}});

    }

    renderModal(){
        return (
        <Modal animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={ 
            this.handleBackPress
        }>
        <View 
            style={{flex: 1, alignItems: 'center', 
            justifyContent:'center', backgroundColor: "#000", padding: 100,}}
        >
            
            <ImageBackground  source={{uri: this.state.selected.path}} style={{flex: 9, justifyContent: "center", alignItems: "center"}}>
                <Image 
                    source={{uri: 'file://'+this.state.selected.path}}
                    style={{width: 500, height: 700}} 
                    
                />
            </ImageBackground>
        </View>
    </Modal>)};


renderItem(item) {
    return (
        <TouchableOpacity  
                 style={{flex:1/3, //here you can use flex:1 also
                 aspectRatio:1}}
                 onPress={() => {
                     this.setState({selected: item, modalVisible: true});
                 }}>
                <Image 
                    source={{ uri:  'file://'+item.path}}
                    style={{flex: 1}} 
                    resizeMode='cover'
                />
        </TouchableOpacity>
    )
}

    render() {
        let { imageUrls } = this.state;
        if(this.state.downloading){
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, width: '100%'}}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <WhiteHeader
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={this.props.navigation.getParam('title')}
                    style={{fontFamily: 'gotham-medium'}}
                    show={false}
                />
                { this.renderModal() }
                <View style={styles.renderImage}>
                    { imageUrls.length > 0 ? (<FlatList
                        numColumns={3}
                        data={this.state.imageUrls}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item,index) => index.toString()}
                    />):
                         (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, width: '100%'}}>
                            <Ionicons name='ios-camera' size={50} />
                            <Text>No Image Uploaded</Text>
                        </View>)
                    }
                </View>
                {/*<ActionButton buttonColor="#51CCE3" 
                    style={{position: 'absolute'}} 
                    onPress={ () => this.update() }
                    renderIcon={(bool)=>(<Ionicons name='md-save' size={24} color='#fff' />)}
                />*/}
            </View>
            
        );
    }
}

const mapStateToProps = ( state, props ) => {
    return {images: getImagesById(state, props.navigation.getParam('id'))};
}

export default connect(mapStateToProps, null)( ViewPhotos )

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    renderImage: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
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