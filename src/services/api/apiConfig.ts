export const BASE_URL = 'https://quick-serve-server.azurewebsites.net/api/v1';

//Athentication endpoints
export const loginEndpoint = `${BASE_URL}/Accounts/authenticate`;
export const registerAccountByAdminEndpoint = `${BASE_URL}/Accounts`;

//User endpoints
export const getAllUsersEndpoint = `${BASE_URL}/Account/GetPagedListAccountQuery`;
export const getUserByIdEndpoint = `${BASE_URL}/Account/GetAccountById`;

//Category endpoints
export const getAllCategoriesEndpoint = `${BASE_URL}/Category/GetPagedListCategory`;
export const createCategoryEndpoint = `${BASE_URL}/Category/CreateCategory`;
export const updateStatusCategoryEndpoint = `${BASE_URL}/Category/UpdateStatusCategory`;
export const deleteCategoryEndpoint = `${BASE_URL}/Category/DeleteCategory`;
export const renameCategoryEndpoint = `${BASE_URL}/Category/UpdateCategory`;

//INGREDIENT endpoints
export const getAllIngredientEndpoint = `${BASE_URL}/Ingredient/GetPagedListIngredient`;

//INGREDIENT TYPE ENDPOINTS
export const getAllIngredientTypesEndpoint = `${BASE_URL}/IngredientType/GetPagedListIngredientType`;
export const createIngredientTypeEndpoint = `${BASE_URL}/IngredientType/CreateIngredientType`;
