import axios from 'axios';

const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
const BASE_URL = `${url}/userservice/v1/getgroupsofuser`;

export const getGroupOfUser = async (userId) => {
    const body = {
        "userDBId": "123",
        "userIndex": userId
    };

    try {
        const response = await axios.post(BASE_URL, body);
        return response.data;
    } catch (error) {
        console.error("Error in getGroupOfUser:", error);
        throw new Error("Failed to fetch group of user");
    }
};
