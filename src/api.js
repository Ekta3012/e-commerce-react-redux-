import axios from 'axios';

export const getCardData = (number) => {
    console.log("axios me page",number)
    return axios.get(`/api/getbracelets?pageNumber=${number}`);
}

export const applyPriceFilter = (params) => {
    return axios.get(`/api/getbracelets?minimum=${params.minimum}&maximum=${params.maximum}`)
}

export const applyCategoryFilter = (category) => {
    return axios.get(`/api/categoryFilterBracelets?category=${category}`)
}

