export const BASE_URL = 'https://quick-serve-server.azurewebsites.net/api/v1';

//Athentication endpoints
export const loginEndpoint = `${BASE_URL}/Accounts/authenticate`;
export const registerAccountByAdminEndpoint = `${BASE_URL}/Accounts`;

//User endpoints
export const getAllUsersEndpoint = `${BASE_URL}/Accounts/paged`;
export const getUserByIdEndpoint = `${BASE_URL}/Account`;

//Category endpoints
export const getAllCategoriesEndpoint = `${BASE_URL}/Categories/paged`;
export const createCategoryEndpoint = `${BASE_URL}/Categories`;
export const updateStatusCategoryEndpoint = `${BASE_URL}/Categories`;
export const deleteCategoryEndpoint = `${BASE_URL}//Categories`;
export const renameCategoryEndpoint = `${BASE_URL}/Categories`;


//INGREDIENT endpoints
export const getAllIngredientEndpoint = `${BASE_URL}/Ingredients/paged`;
export const getIngredientByIdEndpoint = `${BASE_URL}/Ingredients`;
export const createIngredientEndpoint = `${BASE_URL}/Ingredients`;
export const updateIngredientEndpoint = `${BASE_URL}/Ingredients`;
export const deleteIngredientEndpoint = `${BASE_URL}/Ingredients`;
export const changeImageIngredientEndpoint = `${BASE_URL}/Ingredients`;

//INGREDIENT TYPE ENDPOINTS
export const getAllIngredientTypesEndpoint = `${BASE_URL}/IngredientTypes/paged`;
export const getIngredientTypeByIdEndpoint = `${BASE_URL}/IngredientTypes`;
export const createIngredientTypeEndpoint = `${BASE_URL}/IngredientTypes`;
export const updateStatusIngredientType = `${BASE_URL}/IngredientTypes`;
export const renameIngredientTypeEndpoint = `${BASE_URL}/IngredientTypes`;
export const deleteIngredientTypeEndpoint = `${BASE_URL}/IngredientTypes`;
