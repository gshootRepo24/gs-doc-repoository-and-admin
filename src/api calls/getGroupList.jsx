import axios from 'axios';
export const getGroupList = async (userIndex, groupType, orderBy, sortOrder, previousIndex, noOfRecordsToFetch, cabinetName) => {
  const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
  const BASE_URL = `${url}/userservice/v1/getgrouplist`;
  const params = {
    userIndex: parseInt(userIndex, 10),
    groupType: groupType,
    orderBy: orderBy,
    sortOrder: sortOrder,
    previousIndex: parseInt(previousIndex, 10),
    noOfRecordsToFetch: parseInt(noOfRecordsToFetch, 10),
    cabinetName: cabinetName
  };
  const headers = {
    userDBId: 12345
  };
  try {
    const response = await axios.post(BASE_URL, null, { params, headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};
export default getGroupList;