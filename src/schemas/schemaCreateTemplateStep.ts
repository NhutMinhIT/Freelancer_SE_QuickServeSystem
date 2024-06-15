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
});