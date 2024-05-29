import axios from 'axios'
const api = axios.create({

    baseURL: 'https://bn-api.chainservice.io/api',

    timeout: 10000,

});


export const fetchQueryStatistics = async () => {
    try {
        const response = await api.get('/queryStatistics');
        return response.data;
    } catch (error) {
        console.error('Error fetching query statistics:', error.response?.data || error.message);
        throw error;
    }
};

export const fetchQueryCrossList = async (page, size, sourceChainId, destinationChainId,status) => {
    try {
        const queryParameters = new URLSearchParams({
            page,
            size,
            ...(sourceChainId  ? { sourceChainId } : {}),

            ...(destinationChainId  ? { destinationChainId } : {}),
            ...(status  ? { status } : {})

        }).toString();
        const response = await api.get(`/queryCrossList?${queryParameters}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching query statistics:', error.response?.data || error.message);
        throw error;
    }

};

export const fetchQueryCharData = async () => {
    try {
        const response = await api.get(`/queryCharData`);
        return response.data;
    } catch (error) {
        console.error('Error fetching query statistics:', error.response?.data || error.message);
        throw error;
    }
};


export const fetchQueryCrossInfoById = async (id) => {
    try {
        const response = await api.get(`/queryCrossInfoById?id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching query statistics:', error.response?.data || error.message);
        throw error;
    }
};