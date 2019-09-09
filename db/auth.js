import { AsyncStorage } from 'react-native';


const Auth = {
    register: async (formData) => {
        try{
            
            let response = await fetch( 'https://www.cortts.com/api/register.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
    
            let resJson = await response.json();

            resJson['remember'] = formData.remember;
            
            return resJson;
            //let user = await resJson.user;
    
            
            //if(resJson.status){
              //  return JSON.stringify(user);
                //action(JSON.stringify(user));
                //if(formData.remember)
                  //  await AsyncStorage.setItem('userToken', JSON.stringify(user));
                //onSuccess(resJson.msg);
            //}
            //else
               // onError(resJson.msg);
        }catch(err){
            console.log("Something happened could not log you in, please check your network");
        }
    },
    login: async (formData) => {
        try{
            
            let response = await fetch( 'https://www.cortts.com/api/login.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
    
            let resJson = await response.json();

            resJson['remember'] = formData.remember;
            
            return resJson;
            //let user = await resJson.user;
    
            
            //if(resJson.status){
              //  return JSON.stringify(user);
                //action(JSON.stringify(user));
                //if(formData.remember)
                  //  await AsyncStorage.setItem('userToken', JSON.stringify(user));
                //onSuccess(resJson.msg);
            //}
            //else
               // onError(resJson.msg);
        }catch(err){
            console.log(err)
            //console.log("Something happened could not log you in, please check your network");
        }
    },
    forgotPassword: async (formdata, onSuccess, onError) => {
        try{
            response = await fetch( 'https://www.cortts.com/api/forgot.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formdata,
            });
        
            let resJson = await response.json();
        
            return resJson;
            //let status = await resJson.status;

            
            //status ? onSuccess(await resJson.msg) : onError(await resJson.msg);
        }catch(err){
            console.log("cannot reset your password, please check your network");
        }
        
    },
}

export default Auth;

