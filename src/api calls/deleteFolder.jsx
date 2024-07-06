import axios from 'axios';

const url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
const BASE_URL = url + '/folder/v1/deletefolder';

export async function deleteFolder(folderIndex, parentFolderIndex, userDbId) {
  const data = {
    folderIndex: folderIndex,
    referenceFlag: "N",
    checkOutFlag: "Y",
    parentFolderIndex: parentFolderIndex,
    lockFlag: "Y"
  };
  const headers = {
    'userDbId': userDbId
  };

  try {
    const response = await axios.post(BASE_URL, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error deleting folder:', error);
    throw error;
  }
}