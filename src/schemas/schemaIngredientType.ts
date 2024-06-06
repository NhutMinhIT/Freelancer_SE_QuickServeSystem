import * as yup from 'yup';

export const schemaCreateIngredientTypes = yup.object().shape({
    name: yup
        .string()
        .required('Tên thể loại không đuợc để trống')
        .min(1, 'Tên thể loại phải có ít nhất 3 ký tự')
        .max(50, 'Tên thể loại không được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên thể loại không được chứa ký tự đặc biệt',
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase(),
        ),
});
