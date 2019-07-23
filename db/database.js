import REACT from 'react';
import { AsyncStorage } from 'react-native';

import { LOGIN, REGISTER, DELETE, UPLOAD } from '../db/task';


export const getUser = async (task, formData, action, onSuccess, onError) => {
    
    try{
        let response;

        if( task.type === LOGIN){
            response = await fetch( 'https://www.cortts.com/api/login.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        }else if( task.type === REGISTER){
            response = await fetch( 'https://www.cortts.com/api/register.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        }

        let resJson = await response.json();

        let user = await resJson.user;

        
        if(resJson.status){
            action(JSON.stringify(user));
            if(formData.remember)
                await AsyncStorage.setItem('userToken', JSON.stringify(user));
            onSuccess(resJson.msg);
        }
        else
            onError(resJson.msg);
    }catch(err){
        onError("Something happened could not log you in, please check your network");
    }
} 

export const forgotPassword = async (formdata, onSuccess, onError) => {
    try{
        response = await fetch( 'https://www.cortts.com/api/forgot.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata,
        });
       
        let resJson = await response.json();
      
        let status = await resJson.status;

        
        status ? onSuccess(await resJson.msg) : onError(await resJson.msg);
    }catch(err){
        onError("cannot reset your password, please check your network");
    }
    
} 

export const getProps = async (action, onSuccess, compare, onError) => {
    try{
        let response = await fetch('https://www.cortts.com/api/properties');

        let resJson = await response.json();

        let properties = await resJson.props;

        var result = properties.map(function(el) {
            var o = Object.assign({}, el);
            o.key = o.id;
            return o;
        });
        action(result);
        compare(result);
        onSuccess();
    }catch(err){
        onError("Bad network, please check your network");
    }
} 

export const getImages = async (action, onSuccess, onError) => {
    try{
        let response = await fetch('https://www.cortts.com/api/images');

        let resJson = await response.json();

        let images = await resJson.images;


        for (let image of images){
            action(image.prop_id, JSON.parse(image.photos));
        }

        onSuccess();
    }catch(err){
        console.log(err)
        onError("Bad network, please check your network");
    }
} 

export const getUpdates = async (action, onSuccess, onError) => {
    try{
        let data = new FormData();
        let modified = await AsyncStorage.getItem('lastModified');
        data.append('date',modified );
        response = await fetch( 'https://www.cortts.com/api/getUpdates.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: data,
        });
       
        let resJson = await response.json();
      
        let properties = await resJson.props;

        var result = properties.map(function(el) {
            var o = Object.assign({}, el);
            o.key = o.id;
            return o;
        });
        action(result);
        onSuccess();
    }catch(err){
        onError("Something happened could not properties update, please check your network");
    }
    
} 

export const addPropFmDb = async (formData, action, onSuccess, onError) => {
    try{
        let response = await fetch('https://www.cortts.com/api/properties.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        let resJson = await response.json();
        
        if (resJson.status){ 
            let prop = resJson.prop;
            prop.key = prop.id;
            action([prop]);
            onSuccess(resJson.msg, resJson.status);
        }else{
            onError(resJson.msg, resJson.status);
        }
    }catch(err){
        onError("Something happened could not add property, please check your network");
    }
} 

export const editPropFmDb = async  (formData, action, onSuccess, onError) => {
    try{
        let response = await fetch('https://www.cortts.com/api/edit-property.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });


        let resJson = await response.json();
        
        
        if (resJson.status){ 
            let prop = resJson.prop;
            prop.key = prop.id;
            action([prop]);
            onSuccess(resJson.msg, resJson.status);
        }else{
            onError(resJson.msg, resJson.status);
        }
    }catch(err){
        onError("Something happened could not edit property, please check your network");
    }
} 


export const uploadImages = async  (formData, onSuccess, onError, signal) => {
    try{
        let response = await fetch('https://www.cortts.com/api/uploadImage.php', {
            signal: signal,
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
            },
            body: formData,
        });

        
        let resJson = await response.json();
        
        let status = await resJson.status;
        
        
        if (status){ 
            onSuccess(resJson.msg, resJson.path);
        }else{
            onError(resJson.msg);
        }
    }catch(err){
        console.log(err)
        onError(err.message);
    }
} 

export const delPropFmDb = async (id, action) => {
    try{
        let response = await fetch('https://www.cortts.com/api/del-property/'+id);

        let resJson = await response.json();

        let status = await resJson.status;

        if (status){ action(id) };
    }catch(err){
        onError("Something happened could not delete Property, please check your network");
    }
} 


export const addImagesFmDb = async (formData, action, onSuccess, onError) => {
    try{
        let response = await fetch('https://www.cortts.com/api/images.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });

        let resJson = await response.json();
        
        if (resJson.status){ 
            let images = await resJson.images;
            let id = images.prop_id;
            action(id,JSON.parse(images.photos));
            onSuccess(resJson.msg, resJson.status);
        }else{
            onError(resJson.msg, resJson.status);
        }
    }catch(err){
        onError("Something happened could not add images, please check your network");
    }
} 

export const editImagesFmDb = async  (formData, action, onSuccess, onError) => {
    try{
        let response = await fetch('https://www.cortts.com/api/edit-images.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        });


        let resJson = await response.json();
        
        
        if (resJson.status){ 
            let images = await resJson.images;
            let id = images.prop_id;
            action(id,JSON.parse(images.photos));
            onSuccess(resJson.msg, resJson.status);
        }else{
            onError(resJson.msg, resJson.status);
        }
    }catch(err){
        onError("Something happened could not edit images, please check your network");
    }
} 