import * as yup from 'yup';

export const schemaEmployee = yup.object().shape({
    name: yup
        .string()
        .required('Tên nhân viên không đuợc để trống')
        .min(1, 'Tên nhân viên phải có ít nhất 3 ký tự')
        .max(50, 'Tên nhân viên không được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên nhân viên không được chứa ký tự đặc biệt',
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase(),
        ),
    userName: yup
        .string()
        .required('Tên tài khoản không được để trống')
        .min(3, 'Tên tài khoản phải có ít nhất 3 ký tự')
        .max(50, 'Tên tài khoản không được vượt quá 50 ký tự'),
    email: yup
        .string()
        .required('Email không được để trống')
        .email('Email không hợp lệ'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
});

export const schemaRenameEmployee = yup.object().shape({
    id: yup.number().required("ID is required"),
    name: yup
        .string()
        .required('Tên thể loại không được để trống')
        .min(3, 'Tên thể loại phải có ít nhất 3 ký tự')
        .max(50, 'Tên thể loại không được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên thể loại không được chứa ký tự đặc biệt'
        )
        .test(
            'should start with capital letter',
            'Chữ cái đầu phải viết hoa',
            (value) => !!value && value[0] === value[0].toUpperCase()
        ),
})