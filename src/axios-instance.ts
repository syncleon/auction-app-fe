import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});


export { apiInstance };