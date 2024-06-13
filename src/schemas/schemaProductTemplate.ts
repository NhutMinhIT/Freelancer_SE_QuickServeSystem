import * as yup from 'yup';
const categoryIdSchema = yup.number()
    .required('Loại nguyên liệu không được bỏ trống');

const nameSchema = yup.string()
    .required('Tên không được bỏ trống')
    .min(2, 'Tên phải có độ dài lớn hơn 1 kí tự')
    .matches(
        /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
        'Tên mẫu sản phẩm không được chứa ký tự đặc biệt',
    )
    .test(
        'should start with capital letter',
        'Chữ cái đầu phải viết hoa',
        (value) => !!value && value[0] === value[0].toUpperCase(),
    );
const sizeSchema = yup.string()
    .required('Kích cỡ không được bỏ trống')

const priceSchema = yup.number()
    .required('Giá không được bỏ trống')
    .positive('Giá phải là số dương')
    .max(999999999, 'Giá không được lớn hơn 9 chữ số');


const descriptionSchema = yup.string()
    .required('Mô tả không được bỏ trống')
    .max(255, 'Mô tả không được vượt quá 255 kí tự')
    .matches(
        /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
        'Mô tả mẫu sản phẩm không được chứa ký tự đặc biệt',
    )

export const schemaCreateProductTemplate = yup.object().shape({
    categoryId: categoryIdSchema,
    name: nameSchema,
    size: sizeSchema,
    image: yup.mixed().required('Hình ảnh không được bỏ trống'),
    price: priceSchema,
    description: descriptionSchema,
});