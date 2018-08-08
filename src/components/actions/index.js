import { getCardData } from "../../api";

export const DATA_REQUEST="DATA_REQUEST";
export const  DATA_SUCCESS="DATA_SUCCESS";
export const DATA_FAILED="DATA_FAILED"; 
export const ADD_CART="ADD_CART";
export const FILTER_DATA="FILTER_DATA";

export const getData = ()=> {
    return (dispatch)=>{
        getCardData()
        .then(res =>    {
            dispatch({
                type:DATA_SUCCESS,
                payload:res.data
            })
        })
    }
}

export const addCartData = (id) => {
    return (dispatch)=>{
        dispatch({
            type:ADD_CART,
            payload:id
        })
    }
}
