import { ADD_PROP, DEL_PROP, EDIT_PROP, FILTER_PROP } from '../actionTypes';
import { initialState } from './data';


const properties = (state = [], action) => {
    switch (action.type){
        case ADD_PROP: {
            const { prop } = action.payload;
            return [...state, ...prop ];
        }
        case DEL_PROP: {
            const { id } = action.payload;
            console.log(id);
            let properties = state.filter((val,ind) => val.key != id);
            return properties;
        }
        case EDIT_PROP: {
            const { prop } = action.payload;
            let properties = state.filter((val,ind) => val.key != prop.key);
            properties = [...properties,prop];
            return properties;
        }
        case FILTER_PROP: {
            const { keyword } = action.payload;
            console.log(keyword);
            let properties;
            if (keyword != '')
                properties = state.filter((val,ind) => val.title.includes(keyword));
            else
                properties = state;
                
            return properties;
        }
        default:
            return state;
    }
}

export default properties;