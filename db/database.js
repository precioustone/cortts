import REACT from 'react';
import { AsyncStorage } from 'react-native';

import { LOGIN, REGISTER } from '../db/task';

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

        
        console.log(formData);
        
        if(resJson.status){
            action(JSON.stringify(user));
            await AsyncStorage.setItem('userToken', JSON.stringify(user));
            onSuccess(resJson.msg);
        }
        else
            onError(resJson.msg);
    }catch(err){
        console.log(err);
    }
} 

export const getProps = async (action, onSuccess) => {
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
        onSuccess();
    }catch(err){
        console.log(err);
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

        let status = await resJson.status;
        let props = await resJson.props;
        
        if (status){ 
            action(props);
            //navigate('Photos', {details: formData}); 
            onSuccess(resJson.msg)
        }else{
            onError(resJson.msg);
        }
    }catch(err){
        console.log(err);
    }
} 

export const editProp = async (formData, action) => {
    try{
        let response = await fetch('https://www.cortts.com/api/edit-property', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        let resJson = await response.json();

        let status = await resJson.status;

        if (status){ action(formData) };
    }catch(err){
        console.log(err);
    }
} 

export const delPropFmDb = async (id, action) => {
    
    try{
        let response = await fetch('https://www.cortts.com/api/del-property/'+id);

        let resJson = await response.json();

        let status = await resJson.status;

        if (status){ action(id) };
    }catch(err){
        console.log(err);
    }
} 