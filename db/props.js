const Props = {
    getProps: async () => {
        try{
            let response = await fetch('https://www.cortts.com/api/properties');

            let resJson = await response.json();

            let properties = await resJson.props;

            var result = properties.map(function(el) {
                var o = Object.assign({}, el);
                o.key = o.id;
                return o;
            });
            resJson.props = result;
            return resJson;
            //action(result);
            //compare(result);
            //onSuccess();
        }catch(err){
            console.log(err);
            //onError("Bad network, please check your network");
        }
    },
    getUpdates: async () => {
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
            return result;
            //action(result);
            //onSuccess();
        }catch(err){
            console.log(err);
            //onError("Something happened could not properties update, please check your network");
        }
        
    },
    addProp: async (formData) => {
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

            let properties = await resJson.props;

            var result = properties.map(function(el) {
                var o = Object.assign({}, el);
                o.key = o.id;
                return o;
            });
            resJson.props = result;
            
            return resJson;
            /*if (resJson.status){ 
                let prop = resJson.prop;
                prop.key = prop.id;
                action([prop]);
                onSuccess(resJson.msg, resJson.status);
            }else{
                onError(resJson.msg, resJson.status);
            }*/
        }catch(err){
            console.log(err);
            //onError("Something happened could not add property, please check your network");
        }
    }, 
    editProp: async  (formData) => {
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
            let properties = await resJson.props;

            var result = properties.map(function(el) {
                var o = Object.assign({}, el);
                o.key = o.id;
                return o;
            });
            resJson.props = result;
            return resJson;
            /*if (resJson.status){ 
                let prop = resJson.prop;
                prop.key = prop.id;
                action([prop]);
                onSuccess(resJson.msg, resJson.status);
            }else{
                onError(resJson.msg, resJson.status);
            }*/
        }catch(err){
            console.log(err);
            //onError("Something happened could not edit property, please check your network");
        }
    },
    delProp: async (id) => {
        try{
            let response = await fetch('https://www.cortts.com/api/del-property/'+id);

            let resJson = await response.json();
            
            resJson.id = id;

            return resJson;
            //let status = await resJson.status;

            //if (status){ action(id) };
        }catch(err){
            console.log(err);
            //onError("Something happened could not delete Property, please check your network");
        }
    },
    
}

export default Props;