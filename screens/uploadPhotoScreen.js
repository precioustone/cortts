import React, { Component } from 'react';
import { Alert, Image, Modal, FlatList, ProgressBarAndroid, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showMessage} from 'react-native-flash-message';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

import { copyFile, mkdir, uploadFiles, ExternalStorageDirectoryPath, writeFile, unlink } from 'react-native-fs';
import { zip } from 'react-native-zip-archive';
 
import { ButtonThickStr } from '../components/button';
import { EDIT_MODE } from '../db/mode';
import ImageBrowser from '../components/ImageBrowser';
import { getImagesById } from '../redux/selectors';
import { uploadImage } from '../redux/props/actions';
//import Images from '../db/image';
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
            images: [],
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
            jobId: null,
        };
    }
 

    skip = () => {
        this.props.navigation.navigate('List');
    }

    
    
    componentWillUnmount(){
        //this.setState({uploadError: true},this.controller.abort());
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
    
    onSubmit = () => {
        //let data =  new FormData();

        //data.append('photos',JSON.stringify(this.props.images.concat(this.state.imageUrls)));
        //data.append('prop_id', this.props.navigation.getParam('id'));
        let imageDir = `${ExternalStorageDirectoryPath}/cortts/${this.props.title}`;
        let targetDir = `${ExternalStorageDirectoryPath}/cortts/${this.props.title}.zip`;
        //Alert.alert(ExternalStorageDirectoryPath);
        unlink(imageDir);
        unlink(targetDir);
        mkdir(imageDir).catch((err)=>{
            this.onError(err.message);
        });

        for(let i = 0; i < this.state.images.length; i++){
            let file = this.state.images[i].uri.split('/').pop(-1);
            writeFile(`${imageDir}/${file}`,'','base64').catch((err) => Alert.alert(err.message));
            copyFile(this.state.images[i].uri, `${imageDir}/${file}`).catch((err) => {
                this.onError(err.message);
            });
        }

        zip(imageDir, targetDir).then((path) => {
            
            let file = {
                name: 'file',
                filename: this.props.title.replace(/\s/g, "_")+'.zip',
                filepath: path,
                filetype: 'application/zip',
            };

            uploadFiles({
                toUrl: 'https://www.cortts.com/api/uploadImage.php',
                files: [file],
                method: 'POST',
                begin: this.onBegin,
                progress: this.onProgress,
            }).promise.then((result)=>{
                
                unlink(path);
                unlink(imageDir);
               
                return JSON.parse(result.body);
            }).then((reqJson) =>{
                let data =  new FormData();

                data.append('photos',reqJson.path);
                data.append('id', this.props.navigation.getParam('id'));
                this.props.uploadImage(data, this.onSuccess, this.onError);

            }).catch((err)=>{
                this.setState({shouldUpload: true, uploading: false})
                this.onError(err.message);
                unlink(path);
                unlink(imageDir);
            });

        }).catch((err) => {
            this.onError(err.message);
        });
        /*if(this.props.images.length > 0)
            this.props.uploadImage(data, this.onSuccess, this.onError);
        else
            this.props.uploadImage(data, this.onSuccess, this.onError);*/
    }
    
    onBegin = (task) => {
        this.setState({jobId: task.jobId, uploading: true, shouldUpload: false});
    }

    onProgress = (task) => {
        this.setState({progress: Math.floor((task.totalBytesSent/task.totalBytesExpectedToSend) * 100)})
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
        }).then(() => this.setState({shouldUpload: true})).catch((e) => this.onError(e))

    }


    buttonAdd = () =>(
        <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => this.pickImage()}>
            <View>
                <Text style={{color: "#000000"}}>Add</Text>
            </View>
        </TouchableOpacity>);

    buttonCancel = () => (
        <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => {}}>
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
                        source={{ uri:  item.uri } }></Image>
            </TouchableHighlight>
        )
    }

    render() {
        let { images } = this.state;
        let color = this.state.uploadError ? "#d9534f" : "#2196F3";
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={30} callback={this.imageBrowserCallback}/>);
        }
        return (
            <View style={styles.container}>
                <WhiteHeader
                    initialFunction={() => {}}
                    goBack={() => this.props.navigation.goBack()}
                    title={'SELECT IMAGES'}
                    style={{fontFamily: 'gotham-medium'}}
                    rightButton={ this.state.uploading ? this.buttonCancel() : this.buttonAdd()}
                    show={this.state.shouldUpload}
                />
                
                <View style={styles.renderImage}>
                    { images.length > 0 ? (<FlatList
                        numColumns={3}
                        data={this.state.compressedImages}
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
                        onClick={this.state.shouldUpload ? () => this.onSubmit() : () => this.skip()}
                        text={ this.state.shouldUpload ? 'Submit' : 'Skip' }
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
    return {images: getImagesById(state, props.navigation.getParam('id')), title: props.navigation.getParam('title')};
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