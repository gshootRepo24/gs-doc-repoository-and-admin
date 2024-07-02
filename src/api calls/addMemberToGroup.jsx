import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/userservice/v1/addamembertogroups';

export const addMemberToGroups = async (userDbId, userIndex, groups) => {
  const body = {
    userDbId,
    userIndex,
    groups
  };

  try {
    const response = await axios.post(BASE_URL, body);
    return response.data;
  } catch (error) {
    console.error('Error adding member to groups:', error);
    throw error;
  }
};
