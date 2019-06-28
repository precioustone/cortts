import REACT from 'react';
import { AsyncStorage } from 'react-native';

import { LOGIN, REGISTER } from '../db/task';

export const getUser = async (task, formData, action) => {
    try{
        let response;

        if( task.type === LOGIN){
            response = await fetch( 'https://app.cortts.com/api/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        }else if( task.type === REGISTER){
            response = await fetch( 'https://app.cortts.com/api/register', {
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

        action(JSON.stringify(user));
        await AsyncStorage.setItem('userToken', JSON.stringify(user));
    }catch(err){
        console.log(error);
    }
} 

export const getProps = async (action) => {
    try{
        let response = await fetch('https://app.cortts.com/api/properties');

        let resJson = await response.json();

        let properties = await resJson.properties;

        action(properties);
    }catch(err){
        console.log(err);
    }
} 

export const addProp = async (formData, action) => {
    try{
        let response = await fetch('https://app.cortts.com/api/add-properties', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        let resJson = await response.json();

        let status = await resJson.status;

        if (status.ok){ action(formData) };
    }catch(err){
        console.log(err);
    }
} 

export const editProp = async (formData, action) => {
    try{
        let response = await fetch('https://app.cortts.com/api/edit-property', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        let resJson = await response.json();

        let status = await resJson.status;

        if (status.ok){ action(formData) };
    }catch(err){
        console.log(err);
    }
} 

export const delProp = async (id) => {
    try{
        let response = await fetch('https://app.cortts.com/api/del-property', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });

        let resJson = await response.json();

        let status = await resJson.status;

        if (status.ok){ action(id) };
    }catch(err){
        console.log(err);
    }
} 