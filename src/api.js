import axios from 'axios';

export const getCardData = () => {
    return axios.get('./public/data.json')
        .then((response) => {
            return response
        });
}
