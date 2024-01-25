import axios from 'axios';

export default function (){
    const token = localStorage.getItem('token');
    const defaultOptions = {
        baseURL: 'https://fathomless-meadow-68540-ad6f92a6472f.herokuapp.com', // replace with your Heroku app's URL
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };

    return{
        get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
        post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    }
}