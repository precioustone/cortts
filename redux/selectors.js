

export const getUserState = ( store ) => {
    return store.user
};

export const getPropertiesState = ( store ) => store.properties;

export const getUser = ( store ) => getUserState(store) ? getUserState(store): null; 

export const getProperties = ( store ) => getPropertiesState(store) ? getPropertiesState(store) : [];

export const getPropById = ( store, id ) => getPropertiesState(store) ? getProperties(store)[id] : {};

