import { ADD_PROP, DEL_PROP, EDIT_PROP, FILTER_PROP } from '../actionTypes';


const properties = (state = [], action) => {
    switch (action.type){
        case ADD_PROP: {
            const { prop } = action.payload;
            return [...state,...prop ];
        }
        case DEL_PROP: {
            const { id } = action.payload;
            let properties = state.filter((val,ind) => val.key != id);
            return properties;
        }
        case EDIT_PROP: {
            const { prop } = action.payload;
            let properties = state.filter((val,ind) => val.key != prop[0].key);
            
            return [...properties,...prop ];
        }
        case FILTER_PROP: {
            const { keyword } = action.payload;
            let properties;
            if (keyword != '')
                properties = state.filter((val,ind) => {
                    return (val.title.includes(keyword) || 
                    val.date.includes(keyword) || 
                    val.p_type.includes(keyword) || 
                    val.area.includes(keyword))
                });
            else
                properties = state;
                
            return properties;
        }
        default:
            return state;
    }
}

export default properties;