const DEV_API_URL='http://localhost:4000/api';
const PROD_API_URL='http://191.191.190.44:4001/api';

export const API_URL = process.env.NODE_ENV === 'production' ? PROD_API_URL : DEV_API_URL;

export const FILE_API_URL = `${API_URL}/file`;  

export const GOOGLE_ANALYST_ACCOUNT_ID = 'UA-85182371-1';