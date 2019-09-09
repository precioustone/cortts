import { propsAction } from '../actionTypes';


const initialState = [];

const properties = (state = initialState, action) => {
    switch (action.type){
        case propsAction.UPDATE_SUCCESS: {
            const { payload } = action;
            state = initialState;
            return [...state,...payload ];
        }
        case propsAction.DEL_SUCCESS: {
            const { rowKey } = action.payload;
            let properties = state.filter((val,ind) => val.key != rowKey);
            return properties;
        }
        
        default:
            return state;
    }
}

export default properties;