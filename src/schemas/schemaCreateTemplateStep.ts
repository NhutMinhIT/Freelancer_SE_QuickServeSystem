import * as yup from 'yup';

export const schemaCreateTemplateStep = yup.object().shape({
    productTemplateId: yup.number().required('Id không được để trống'),
    name: yup
        .string()
        .required('Tên không đuợc để trống')
        .min(1, 'Tên phải có ít nhất 3 ký tự')
        .max(50, 'Tên hông được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên không được chứa ký tự đặc biệt',
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase(),
        ),
    ingredientTypes: yup.array().of(
        yup.object().shape({
            ingredientTypeId: yup.number().required('Id nguyên liệu không được để trống'),
            quantityMin: yup.number().required('Số lượng tối thiểu không được để trống').min(0, 'Số lượng tối thiểu không được nhỏ hơn 0'),
            quantityMax: yup.number().required('Số lượng tối đa không được để trống').min(yup.ref('quantityMin'), 'Số lượng tối đa không được nhỏ hơn số lượng tối thiểu'),
        })
    ).required('Danh sách nguyên liệu không được để trống'),
});