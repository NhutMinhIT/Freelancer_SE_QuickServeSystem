import * as yup from 'yup';

export const schemaCreateIngredientNutrition = yup.object().shape({
    ingredientId: yup.number().required('Id không được để trống'),
    nutritionIds: yup.array().of(
        yup.number().required('Id dinh dưỡng không được để trống')
    ).required('Danh sách dinh dưỡng không được để trống')
});

export const schemaUpdateIngredientNutrition = yup.object().shape({
    ingredientId: yup.number().required('Id không được để trống'),
    nutritionIds: yup.array().of(
        yup.number().required('Id dinh dưỡng không được để trống')
    ).required('Danh sách dinh dưỡng không được để trống')
});