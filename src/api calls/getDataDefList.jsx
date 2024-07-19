import axios from 'axios';

const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const BASE_URL = `${url}/metadata/v1/getdatadeflist`;

export const getDataDefList = async () => {
  try {
    const response = await axios.post(BASE_URL, {
      orderBy: 1,
      type: "F"
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending POST request:', error);
  }
};