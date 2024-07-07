import * as yup from 'yup';

export const schemaCreateIngredientSession = yup.object().shape({
    sessionId: yup.number().required('Id không được để trống'),
    ingredients: yup.array().of(
        yup.object().shape({
            id: yup.number().required('Id nguyên liệu không được để trống'),
            quantity: yup.number().required('Số lượng tối thiểu không được để trống').min(0, 'Số lượng tối thiểu không được nhỏ hơn 0'),
        })
    ).required('Danh sách nguyên liệu không được để trống'),
});