import * as yup from 'yup';

export const schemaCategory = yup.object().shape({
    categoryName: yup
        .string()
        .required('Tên thể loại không đuợc để trống')
        .min(3, 'Tên thể loại phải có ít nhất 3 ký tự')
        .max(50, 'Tên thể loại không được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s]*$/,
            'Tên thể loại không được chứa ký tự đặc biệt',
        ),
});
