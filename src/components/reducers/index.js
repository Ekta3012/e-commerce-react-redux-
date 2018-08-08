import { DATA_REQUEST,DATA_SUCCESS,DATA_FAILED,ADD_CART,FILTER_DATA } from "../actions";

const initialState={
    data:[],
    cart:[]
}

export default function addDatatoView(state=initialState,action){
    switch(action.type){
        case DATA_SUCCESS:
            const obj=action.payload
            return Object.assign({},state,{data:obj})

        case ADD_CART:
            const obj_a=action.payload
            const array=state.cart.slice();
            array.push(obj_a)
            return Object.assign({}, state, {
                cart:array
            })
            
        default:    
            return initialState;
    }
}