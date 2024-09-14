const BASE_URL = 'http://localhost:8080/api/v1';

export const API_ENDPOINTS = {
    SIGN_IN: `${BASE_URL}/signin`,
    SIGNUP: `${BASE_URL}/signup`,
    ITEMS: `${BASE_URL}/items`,
    ITEM_IMAGE: (id: string) => `${BASE_URL}/items/${id}/images/0`
};
