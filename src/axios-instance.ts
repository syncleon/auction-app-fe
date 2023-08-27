import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

const imageInstance = axios.create({
    baseURL: 'http://localhost:63958/',
});

export { apiInstance, imageInstance };