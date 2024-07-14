import React from 'react';
import { useLoginContext } from './LoginContext';

const useApiRequest = () => {
    const auth = useLoginContext();

    const sendRequest = async (url, method, data = null) => {
        try {
            let headers = {};

            if (auth.userInfo.token !== null) {
                headers.Authorization = `Token ${auth.userInfo.token}`;
            }

            const requestOptions = {
                method: method,
                headers: headers,
                body: data !== null ? data : null,
            };

            const apiResponse = await fetch(url, requestOptions);
            const responseData = await apiResponse.json();
            return responseData

        } catch (err) {
            return err
        }
    };
    
    const postRequest = async (url, data) => {
        return await sendRequest(url, 'POST', data);
    };
    
    const putRequest = async (url, data) => {
        return await sendRequest(url, 'PUT', data);
    };
    
    const deleteRequest = async (url) => {
        return await sendRequest(url, 'DELETE');
    };
    
    const getRequest = async (url) => {
        return await sendRequest(url, 'GET');
    };

    return { postRequest, putRequest, deleteRequest, getRequest };
};

export default useApiRequest;
