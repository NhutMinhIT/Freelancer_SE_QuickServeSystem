export const BASE_URL = 'https://quick-serve-server.azurewebsites.net/api/v1';

//Athentication endpoints
export const loginEndpoint = `${BASE_URL}/Account/Authenticate`;
export const registerAccountByAdminEndpoint = `${BASE_URL}/Account/CreateAccount`;

//User endpoints
export const getAllUsersEndpoint = `${BASE_URL}/Account/GetPagedListAccountQuery`;
export const getUserByIdEndpoint = `${BASE_URL}/Account/GetAccountById`;

//Category endpoints
export const getAllCategoriesEndpoint = `${BASE_URL}/Category/GetPagedListCategory`;
export const createCategoryEndpoint = `${BASE_URL}/Category/CreateCategory`;
export const updateStatusCategoryEndpoint = `${BASE_URL}/Category/UpdateStatusCategory`;
export const deleteCategoryEndpoint = `${BASE_URL}/Category/DeleteCategory`;
export const renameCategoryEndpoint = `${BASE_URL}/Category/UpdateCategory`;
