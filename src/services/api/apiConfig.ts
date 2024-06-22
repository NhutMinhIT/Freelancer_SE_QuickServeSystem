export const BASE_URL = 'https://quickserve-api.azurewebsites.net/api/v1';

//Athentication endpoints
export const loginEndpoint = `${BASE_URL}/Accounts/authenticate`;
export const refreshTokenEndpoint = `${BASE_URL}/Accounts/refresh`;
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

//Product Template endpoints
export const getAllProductTemplatesEndpoint = `${BASE_URL}/ProductTemplates/paged`;
export const getProductTemplateByIdEndpoint = `${BASE_URL}/ProductTemplates`;
export const createProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;
export const updateProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;
export const deleteProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;
export const changeImageProductTemplateEndpoint = `${BASE_URL}/ProductTemplates`;

//Template Step endpoints
export const getAllTemplateStepsEndpoint = `${BASE_URL}/TemplateSteps/paged`;
export const getTemplateStepByIdEndpoint = `${BASE_URL}/TemplateSteps`;
export const createTemplateStepEndpoint = `${BASE_URL}/TemplateSteps`;
export const renameTemplateStepEndpoint = `${BASE_URL}/TemplateSteps`;
export const deleteTemplateStepEndpoint = `${BASE_URL}/TemplateSteps`;

//Store endpoints
export const getAllStoreEndpoint = `${BASE_URL}/Stores/paged`;
export const getStoreByIdEndpoint = `${BASE_URL}/Stores`;
export const createStoreEndpoint = `${BASE_URL}/Stores`;


//Employees endpoints
export const getAllEmployeeEndpoint = `${BASE_URL}/employees/paged`;
export const createEmployeeEndpoint = `${BASE_URL}/employees`;

// Ingredient Type Template Steps endpoints
export const getIngredientTypeTemplateStepsEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps/all`;
export const getIngredientTypeTemplateStepByIdEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const createIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const updateStatusIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const updateIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;
export const deleteIngredientTypeTemplateStepEndpoint = `${BASE_URL}/IngredientTypeTemplateSteps`;

