import * as yup from 'yup';

export const schemaCreateIngredient = yup.object().shape({
    name: yup.string()
        .required('Tên không được bỏ trống')
        .min(2, 'Tên phải có độ dài lớn hơn 1 kí tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên nguyên liệu không được chứa ký tự đặc biệt',
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase(),
        ),
    price: yup.number()
        .required('Giá không được bỏ trống')
        .positive('Giá phải là số dương')
        .max(999999999, 'Giá không được lớn hơn 9 chữ số'),
    calo: yup.number()
        .required('Calo không được bỏ trống')
        .positive('Calo phải là số dương')
        .max(999999999, 'Giá không được lớn hơn 9 chữ số'),
    description: yup.string()
        .required('Mô tả không được bỏ trống')
        .max(255, 'Mô tả không được vượt quá 255 kí tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Mô tả nguyên liệu không được chứa ký tự đặc biệt',
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase(),
        ),
    image: yup.mixed().required('Hình ảnh không được bỏ trống'),
    ingredientTypeId: yup.number()
        .required('Loại nguyên liệu không được bỏ trống'),
});