import httpClient from '../../httpClient';

const getTableData = async (user = null) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = user ? `${url}/tables/me` : `${url}/tables`;

  const res = await httpClient.get(apiUrl);

  return res.data;
};

export default getTableData;
