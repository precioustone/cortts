import { ADD_PROP, DEL_PROP, EDIT_PROP } from '../actionTypes';


const properties = (state, action) => {
    switch (action.type){
        case ADD_PROP: {
            const { prop } = action.payload;
            let properties = state.properties ? state.properties : [];
            properties = [...properties,prop];
            return {...state, properties };
        }
        case DEL_PROP: {
            const { id } = action.payload;
            let properties = state.properties.filter((val,ind) => val.key != id);
            return {...state, properties };
        }
        case EDIT_PROP: {
            const { prop } = action.payload;
            let properties = state.properties.filter((val,ind) => val.key != prop.key);
            properties = [...properties,prop];
            return {...state, properties };
        }
        default:
            return state;
    }
}