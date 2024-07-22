import * as yup from 'yup';

export const schemaCreateIngredientNutrition = yup.object().shape({
    ingredientId: yup.number().required('Id không được để trống'),
    nutritionIds: yup.array().of(
        yup.object().shape({
            id: yup.number().required('Id nguyên liệu không được để trống'),
        })
    ).required('Danh sách nguyên liệu không được để trống'),
});

export const schemaUpdateIngredientNutrition = yup.object().shape({
    ingredientId: yup.number().required('Id không được để trống'),
    nutritionIds: yup.array().of(
        yup.object().shape({
            id: yup.number().required('Id nguyên liệu không được để trống'),
        })
    ).required('Danh sách nguyên liệu không được để trống'),
});