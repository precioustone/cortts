

export const getUserState = ( store ) => store.user;

export const getPropertiesState = ( store ) => store.properties;

export const getImagesState = ( store ) => store.images;


export const getUser = ( store ) => getUserState(store) ? JSON.parse(getUserState(store)): {}; 

export const getProperties = ( store ) => getPropertiesState(store) ? getPropertiesState(store) : [];

export const getPropById = ( store, id ) => {
    if(getPropertiesState(store)){
        let prop = getPropertiesState(store).find( (el) => {
            return el.key == id;
        });
        return prop;
    }
    return {};
}

export const getImagesById = ( store, id ) => getImagesState(store) && getImagesState(store)[id] ? getImagesState(store)[id] : [];

