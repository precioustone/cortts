import React, { Component } from 'react';
import { ActivityIndicator, Image, ImageBackground, Modal, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux';
import 'abortcontroller-polyfill';

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
            selected: {key: 10000, uri: ''},
        };
    }

    

    componentDidMount(){
        let images = this.props.images;
        if(images.length > 0){
            this.setState({imageUrls: images});
        }
    }


    handleBackPress = () => {
        this.setState({ modalVisible: false, selected: {key: 10000, uri: ''}});
    }

    renderModal(){
        return (<Modal animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={ 
            this.handleBackPress
        }>

        <View 
            style={{flex: 1, alignItems: 'center', 
            justifyContent:'center', backgroundColor: "#000", padding: 100,}}
        >
            
            <ImageBackground  source={{uri: this.state.selected.uri}} style={{flex: 9, justifyContent: "center", alignItems: "center"}}>
                <Image 
                    source={{uri: this.state.selected.uri}}
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
                    source={{ uri:  item.uri}}
                    style={{flex: 1}} 
                    resizeMode='cover'
                />
        </TouchableOpacity>
    )
}

    render() {
        let { imageUrls } = this.state;
        
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