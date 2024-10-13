const BASE_URL = 'http://localhost:8080/api/v1';

export const API_ENDPOINTS = {
    SIGN_IN: `${BASE_URL}/signin`,
    SIGNUP: `${BASE_URL}/signup`,
    ITEMS: `${BASE_URL}/items`,
    CURRENT_USER_ITEMS : `${BASE_URL}/users/current/items`,
};
