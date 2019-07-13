import React, { Component } from 'react';
import { Alert, Image, Modal, FlatList, ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showMessage} from 'react-native-flash-message';
import * as Permissions from 'expo-permissions';
import 'abortcontroller-polyfill';

import { ButtonThickStr } from '../components/button';
import { uploadImages, } from '../db/database';
import { EDIT_MODE } from '../db/mode';
import { editProp } from '../redux/actions';
import ImageBrowser from '../components/ImageBrowser';
import { getProperties} from '../redux/selectors';
import { editPropFmDb} from '../db/database';
import { WhiteHeader } from '../components/customHeader';





class ViewPhotos extends Component{

    static navigationOptions = {
       //title: 'SELECT IMAGES',
       header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            property: this.getPropById(props.navigation.getParam('id')),
            mode: EDIT_MODE,
            msg: null,
            images: null,
            imageUrls: [],
            modalVisible: false,
            uploadError: false,
            uploadSuccess: false,
            uploading: false,
            retryUpload: false,
            noOfUploads: 0,
            shouldUpload: false,
        };

        this.controller = new AbortController();
    }

    getPropById = (id) => {
        let prop = this.props.properties.find( (el) => {
            return el.key == id;
        });
        
        return prop;
    }  
    

    componentDidMount(){
        //let images = this.state.property.photos == null || this.state.property.photos == "" ? [] : JSON.parse(this.state.property.photos);
        //if(images.length > 0){
            //this.setState({imageUrls: images});
        //}
    }

    componentWillUnmount(){
        this.setState({uploadError: true})
        this.controller.abort();
    }

   

    onSelect = () => {
        
        let index = this.state.noOfUploads;
        for ( let i= index; i < this.state.images.length; i++){
            let item = this.state.images[i];
            let data = new FormData();
            data.append("image", {
              uri: item.uri,
              type: "image/jpeg",
              name: item.filename || `${this.state.property.title}${i}.jpg`,
            });
            data.append('Content-Type', 'image/jpeg');
            if(this.state.uploadError){
                this.setState({noOfUploads: i})
                break;
            }
            uploadImages(data, (msg, path) => this.uploadSuccess(msg, i+1, path), (err) => this.uploadError(err), this.controller.signal );

        }

        if(this.state.retryUpload){
            this.onSelect()
        }

    }

    cancel = () =>{
        this.controller.abort();
        this.setState({images: null, imageUrls: [], uploading: false, shouldUpload: false, uploadError: false, uploadSuccess: false})
    }

    onSubmit = () => {
        let data =  this.state.property
        data.photos = JSON.stringify(this.state.imageUrls);
        
        editPropFmDb(this.state.property, this.props.editProp, this.onSuccess, this.onError);
    }

    onError = (response) => {
        this.setState({modalVisible: !this.state.modalVisible, msg: response, progress: !this.state.progress});
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: false,
        });
    }


    onSuccess = (response) => {
        this.setState({modalVisible: !this.state.modalVisible,msg: response,progress: !this.state.progress});
        showMessage({
            message: this.state.msg,
            type: "success",
            autoHide: false,
        });
        this.props.navigation.navigate('List');
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
        <TouchableOpacity  
                 style={{flex:1/3, //here you can use flex:1 also
                 aspectRatio:1}}>
                <Image style={{flex: 1}} resizeMode='cover' 
                    source={ item.uri ? { uri:  item.uri} : item.plh}></Image>
        </TouchableOpacity>
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
                    />):
                         (<TouchableOpacity onPress={this.handleClick}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200, width: '100%'}}>
                            <Ionicons name='ios-camera' size={50} />
                            <Text>UploadPhotos</Text>
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
                        <Text style={{color: color, textAlign: "center"}}>uploaing...</Text>
                    </View>) : null}
                   
                    <ButtonThickStr 
                        onClick={this.state.uploadSuccess ? () => this.onSubmit() : () => this.skip()}
                        text={ this.state.imageUrls.length <= 0 ? 'Submit' : 'Skip' }
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

const mapStateToProps = ( state ) => {
    return {properties: getProperties(state)};
}

export default connect(mapStateToProps, { editProp })( ViewPhotos )

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