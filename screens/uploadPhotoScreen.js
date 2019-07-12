import React, { Component } from 'react';
import { Alert, Image, Modal, FlatList, ProgressBarAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showMessage} from 'react-native-flash-message';

import { ButtonThickStr } from '../components/button';
import { uploadImages, } from '../db/database';
import { EDIT_MODE } from '../db/mode';
import { editProp } from '../redux/actions';
import ImageBrowser from '../components/ImageBrowser';
import { getProperties} from '../redux/selectors';
import { editPropFmDb} from '../db/database';




class UploadPhotos extends Component{

    static navigationOptions = {
       title: 'SELECT IMAGES',
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
            imageBrowserOpen: false,
            progress: 0,
            animating: false,
            uploadError: false,
            retryUpload: false,
            noOfUploads: 0,
        };
    }

    getPropById = (id) => {
        console.log(this.props.properties);
        let prop = this.props.properties.find( (el) => {
            return el.key == id;
        });
        
        return prop;
    }  

    skip = () => {
        this.props.navigation.navigate('List');
    }

    

    uploadSuccess = (msg, i) => {
        let progress = i / this.state.images.length;
        this.setState({progress});
        if(progress == 1){
            this.setState({msg})
            showMessage({
                message: this.state.msg,
                type: "success",
                autoHide: true,
            });
        }
    }

    uploadError = (msg) =>{
        this.setState({uploadError: true});
        this.setState({ msg });
        showMessage({
            message: this.state.msg,
            type: "danger",
            autoHide: true,
        });
    }

    componentDidMount(){
        let images = this.state.property.photos == null ? [] : JSON.parse(this.state.property.photos);
        if(images.length > 0){
            this.setState({imageUrls: images});
        }
    }

    handleClick = () => {
        this.setState({modalVisible: !this.state.modalVisible});
    };

    onSelect = () => {
        this.setState({animating: true});
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
            uploadImages(data, (msg) => this.uploadSuccess(msg, i+1), (err) => this.uploadError(err) )

            if(this.state.uploadError){
                this.setState({noOfUploads: i})
                break;
            }
        }

        if(this.state.retryUpload){
            this.onSelect()
        }

    }

    onSubmit = () => {
        let data =  this.state.property
        //this.setState({property: {...this.state.property, photos: JSON.stringify(this.state.imageUrls)}});
        data.photos = JSON.stringify(this.state.imageUrls);
        console.log(data);
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

    pickImage = () => this.setState({imageBrowserOpen: true, modalVisible: !this.state.modalVisible});

    imageBrowserCallback = (callback) => {
        callback.then((images) => {
          this.setState({
            imageBrowserOpen: false,
            images
          })
        }).then(()=>{
            let urls = [];
            this.state.images.forEach((el, i)=>{
                urls.push({uri: el.file, key: i});
            })
            this.setState({imageUrls: [...this.state.imageUrls, ...urls]});
        }).then(() => this.onSelect()).catch((e) => this.onError(e))

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
                <Image style={{flex: 1}} resizeMode='cover' source={{ uri:  item.uri}}></Image>
        </TouchableOpacity>
    )
}

    render() {
        let { imageUrls } = this.state;
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser max={30} callback={this.imageBrowserCallback}/>);
        }
        return (
            <View style={styles.container}>

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
                <View style={{ width: '100%', paddingVertical: 20, backgroundColor: '#fff'}}>
                    <ProgressBarAndroid 
                        styleAttr="Horizontal" 
                        color={ this.state.uploadError ? "#d9534f" : "#2196F3" }
                        animating={this.state.animating }
                        progress={this.state.progress}
                        indeterminate={false}
                    />
                    <ButtonThickStr 
                        onClick={this.state.imageUrls.length <= 0 ? () => this.skip() : () => this.onSubmit()}
                        text={ this.state.imageUrls.length <= 0 ? 'Skip' : 'Upload' }
                        style={styles.button}
                        containerStyle={{ backgroundColor: '#26B469', borderColor: "#FFF"}}
                    />
                </View>
            </View>
            
        );
    }
}

const mapStateToProps = ( state ) => {
    return {properties: getProperties(state)};
}

export default connect(mapStateToProps, { editProp })( UploadPhotos )

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