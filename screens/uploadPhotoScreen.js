import React, { Component } from 'react';
import { Alert, Image, Modal, FlatList, ProgressBarAndroid, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showMessage} from 'react-native-flash-message';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Asset from 'expo-asset';
import 'abortcontroller-polyfill';

import { ButtonThickStr } from '../components/button';
import { EDIT_MODE } from '../db/mode';
import ImageBrowser from '../components/ImageBrowser';
import { getImagesById } from '../redux/selectors';
import { uploadImage } from '../redux/actions';
import { addImagesFmDb, editImagesFmDb,uploadImages } from '../db/database';
import { WhiteHeader } from '../components/customHeader';







class UploadPhotos extends Component{

    static navigationOptions = {
       //title: 'SELECT IMAGES',
       header: null,
    };

    static uuidv4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }

    constructor(props){
        super(props);
        this.state = {
            mode: EDIT_MODE,
            msg: null,
            images: null,
            compressedImages: [],
            imageUrls: [],
            modalVisible: false,
            imageBrowserOpen: false,
            progress: 0,
            uploadError: false,
            uploadSuccess: false,
            uploading: false,
            retryUpload: false,
            noOfUploads: 0,
            shouldUpload: false,
        };

        this.controller = new AbortController();
    }
 

    skip = () => {
        this.props.navigation.navigate('List');
    }

    

    uploadSuccess = (msg, i, path) => {

        let progress = (i + 1) / this.state.images.length;

        let uri = this.state.imageUrls.filter((el) => (el.id != i));

        uri = [...uri, {id: i, uri: path}];

        this.setState({imageUrls: uri,progress});

        if(progress == 1){
            this.setState({msg, images: null, uploading: false, uploadSuccess: true, shouldUpload: false, uploadError: false})
            showMessage({
                message: this.state.msg,
                type: "success",
                autoHide: true,
            });
        }
    }

    uploadError = (msg) =>{
        this.setState({msg, uploadError: true, uploadSuccess: false, uploading: false,});
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: true,
        });
    }

    
    componentWillUnmount(){
        this.setState({uploadError: true},this.controller.abort());
    }

    handleClick = async () => {
        const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

        if (permission.status !== 'granted') {
            const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (newPermission.status === 'granted') {
              //its granted.
              //this.setState({modalVisible: true});
              this.pickImage();
            }
        } else {
            //this.setState({modalVisible: true});
            this.pickImage();
        }
        
    };

    onSelect = () => {
        
        let index = this.state.noOfUploads;
        let { compressedImages } = this.state;
        let max = compressedImages.length;

        this.setState({uploadError: false})

        for ( let i = index; i < max; i++){
            let item = compressedImages[i];
            let data = new FormData();

            data.append("image", {
              uri: item.uri,
              type: "image/jpeg",
              name: item.filename || `${UploadPhotos.uuidv4()}${i}.jpg`,
              title: this.props.navigation.getParam('title'),
            });

            data.append('Content-Type', 'image/jpeg');

            if(this.state.uploadError){
                this.setState({noOfUploads: i})
                break;
            }

            uploadImages(data, (msg, path) => this.uploadSuccess(msg, i, path), (err) => this.uploadError(err), this.controller.signal );

        }

        if(this.state.retryUpload){
            this.onSelect()
        }

    }

    

    cancel = () =>{
        this.setState({images: null, 
            imageUrls: [], 
            uploading: false, 
            shouldUpload: false, 
            uploadError: false, 
            uploadSuccess: false, 
            noOfUploads: 0},this.controller.abort())
    }

    onSubmit = () => {
        let data =  new FormData();

        data.append('photos',JSON.stringify(this.props.images.concat(this.state.imageUrls)));
        data.append('prop_id', this.props.navigation.getParam('id'));
        if(this.props.images.length > 0)
            editImagesFmDb(data, this.props.uploadImage, this.onSuccess, this.onError);
        else
            addImagesFmDb(data, this.props.uploadImage, this.onSuccess, this.onError);
    }

    onError = (response) => {
        this.setState({msg: response});
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }


    onSuccess = (response) => {
        this.setState({msg: response});
        showMessage({
            message: this.state.msg,
            type: "success",
            autoHide: false,
        });
        this.props.navigation.navigate('List');
    }


    pickImage = () => this.setState({imageBrowserOpen: true, modalVisible: false});

    compressImage = async (image) => {
        const compImage = await ImageManipulator.manipulateAsync(image,[{ resize: { width: 800 } }],{compress: 0.6, format: ImageManipulator.SaveFormat.JPEG});
        return compImage;
    }

    imageBrowserCallback = (callback) => {
        callback.then((images) => {
          this.setState({
            imageBrowserOpen: false,
            images
          })
        }).then(()=> {
            for( let i = 0; i < this.state.images.length; i++){
                this.compressImage(this.state.images[i].uri).then((image)=> {
                    this.setState({compressedImages: [...this.state.compressedImages, {id: i, uri: image.uri}]})
                })
            }
        }).then(() => {
            for( let i = 0; i < this.state.images.length; i++){
                let uri = [];
                uri.push({localUri: this.state.images[i].uri, id: i});
                uri = [...this.state.imageUrls, ...uri]
                this.setState({imageUrls: uri,});
            }
        }).then(() => this.setState({uploading: false, shouldUpload: true})).catch((e) => this.onError(e))

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

    buttonUpload = () =>(
        <TouchableOpacity style={{marginHorizontal: 15}} onPress={() =>{ 
                this.setState({uploading: true});
                this.onSelect();
            }
        }>
            <View>
                <Text style={{color: "#000000"}}>Upload</Text>
            </View>
        </TouchableOpacity>);

    buttonCancel = () => (
        <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => this.cancel()}>
            <View>
                <Text style={{color: "#000000"}}>cancel</Text>
            </View>
        </TouchableOpacity>);

renderItem(item) {
    return (  
        <TouchableHighlight  
                 style={{flex:1/3, //here you can use flex:1 also
                 aspectRatio:1, opacity: item.uri ? 1 : 0.4}}>
                <Image style={{flex: 1}} resizeMode='cover' 
                    source={{ uri:  item.uri ? item.uri: item.localUri} }></Image>
        </TouchableHighlight>
    )
}

    render() {
        let { imageUrls } = this.state;
        let color = this.state.uploadError ? "#d9534f" : "#2196F3";
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={30} callback={this.imageBrowserCallback}/>);
        }
        return (
            <View style={styles.container}>
                <WhiteHeader
                    initialFunction={() => this.initialFunction()}
                    goBack={() => this.props.navigation.goBack()}
                    title={'SELECT IMAGES'}
                    style={{fontFamily: 'gotham-medium'}}
                    rightButton={ this.state.uploading ? this.buttonCancel() : this.buttonUpload()}
                    show={this.state.shouldUpload}
                />
                { this.renderModal() }
                <View style={styles.renderImage}>
                    { imageUrls.length > 0 ? (<FlatList
                        numColumns={3}
                        data={this.state.imageUrls}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={(item,index) => index.toString()}
                    />):
                         (<TouchableOpacity onPress={this.handleClick}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, width: '100%'}}>
                            <Ionicons name='ios-camera' size={50} />
                            <Text>Upload Images</Text>
                        </View>
                    </TouchableOpacity>)
                    }
                </View>
                <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 10, backgroundColor: '#fff'}}>
                    {this.state.uploading? (<View style={{width: '100%'}}>
                        <ProgressBarAndroid 
                            styleAttr="Horizontal" 
                            color={ color }
                            animating={true}
                            progress={this.state.progress}
                            indeterminate={false}
                        />
                        <Text style={{color: color, textAlign: "center"}}>uploading...</Text>
                    </View>) : null}
                   
                    <ButtonThickStr 
                        onClick={this.state.uploadSuccess ? () => this.onSubmit() : () => this.skip()}
                        text={ this.state.uploadSuccess ? 'Submit' : 'Skip' }
                        style={styles.button}
                        containerStyle={
                            this.state.uploading ?
                            { backgroundColor: '#C6C6C6', borderColor: "#FFF"} :
                            { backgroundColor: '#26B469', borderColor: "#FFF"}
                        }
                        disabled={this.state.uploading}
                    />
                </View>
            </View>
            
        );
    }
}

const mapStateToProps = ( state, props ) => {
    return {images: getImagesById(state, props.navigation.getParam('id'))};
}

export default connect(mapStateToProps, { uploadImage })( UploadPhotos )

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