import * as yup from 'yup';

export const schemaNutrition = yup.object().shape({
  id: yup.number().required("Id là bắt buộc"),
    name: yup
        .string()
        .required('Tên dinh dưỡng không đuợc để trống')
        .min(1, 'Tên dinh dưỡng phải có ít nhất 3 ký tự')
        .max(50, 'Tên dinh dưỡng không được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên dinh dưỡng không được chứa ký tự đặc biệt',
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase(),
        ),
        description : yup.string(),
        vitamin: yup.string(),
        healthValue: yup.string()
});