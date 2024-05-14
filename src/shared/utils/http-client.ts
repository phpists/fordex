import axios from 'axios';

const BASE_URL = 'https://test.fordexs.com';

export const httpClient = axios.create({
  baseURL: BASE_URL,
});
