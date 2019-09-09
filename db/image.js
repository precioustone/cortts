const Images = {
    getImages: async (onError) => {
        try{
            let response = await fetch('https://www.cortts.com/api/images');

            let resJson = await response.json();

            let images = await resJson.images;
            
            return images;

            //for (let image of images){
              //  action(image.prop_id, JSON.parse(image.photos));
            //}

            //onSuccess();
        }catch(err){
            console.log(err)
            onError("Bad network, please check your network");
        }
    },
    uploadImages: async  (formData) => {
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
            
            return resJson;
            
        }catch(err){
            console.log(err)
        }
    },
    addImages: async (formData) => {
        try{
            let response = await fetch('https://www.cortts.com/api/images.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
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
          
        }catch(err){
            return err;
        }
    }, 
    editImages: async  (formData, action, onSuccess, onError) => {
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
}

export default Images;