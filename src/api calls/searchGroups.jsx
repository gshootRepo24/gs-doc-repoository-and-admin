import axios from 'axios';

// Define the URL and the request body
const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
const BASE_URL = `${url}/userservice/v1/searchgroup`;

export const searchGroups=async(name)=>{
    const body={
        userDbId: "123",
        groupName:name,
        parentGroupIndex:"1",
        expiryDateTime:"",
        sortOrder:"A",
        orderBy:"1",
        noOfRecordsToFetch:"100",
        startFrom:"1",
        creationDateTime:"",
        enableDepartmentFilter:""
    }

    try {
        const response = await axios.post(BASE_URL,body);
        return response.data;
    } catch (error) {
        console.error(error)
    }
}