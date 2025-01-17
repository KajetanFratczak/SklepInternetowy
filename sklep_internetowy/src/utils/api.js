//Zestaw funkcji API, które służą do komunikacji z Backendem aplikacji.

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
    // Products
    getAllProducts: async () => {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
    },

    getProductById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        return response.json();
    },

    // Reviews
    getProductReviews: async (productId) => {
        const response = await fetch(`${API_BASE_URL}/reviews/${productId}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return response.json();
    },

    createReview: async (reviewData) => {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });
        if (!response.ok) throw new Error('Failed to create review');
        return response.json();
    },

    deleteReview: async (reviewId) => {
        const response = await fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete review');
        return response.json();
    },

    // Orders
    getUserOrders: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch orders');
        return response.json();
    },

    createOrder: async (orderData) => {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) throw new Error('Failed to create order');
        return response.json();
    },

    //Users
    login: async (username, password) => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error('Błędne dane logowania');
        return response.json();
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) throw new Error('Nie udało się zarejestrować');
        return response.json();
    },

    getUserProfile: async (userId) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!response.ok) throw new Error('Nie udało się pobrać profilu');
        return response.json();
    }

};