import axios from 'axios';


let development = process.env.NODE_ENV !== 'production';

export const api = axios.create({
    baseURL: development ?  "https://localhost:44395/" : "https://api-glads-go.herokuapp.com/"
})