import * as yup from 'yup';

const nameSchema = yup.string()
    .required('Tên dinh dưỡng không được để trống')
    .min(1, 'Tên dinh dưỡng phải có ít nhất 1 ký tự')
    .max(50, 'Tên dinh dưỡng không được vượt quá 50 ký tự')
    .matches(
        /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
        'Tên dinh dưỡng không được chứa ký tự đặc biệt',
    )
    .test(
        'should start with capital letter',
        'Chữ cái đầu phải viết hoa',
        (value) => !!value && value[0] === value[0].toUpperCase(),
    );

const descriptionSchema = yup.string()
    .max(255, 'Mô tả không được vượt quá 255 ký tự');

const healthValueSchema = yup.string()
    .max(255, 'Giá trị dinh dưỡng không được vượt quá 255 ký tự');

const vitaminSchema = yup.string()
    .min(2, 'Vitamin phải có ít nhất 2 ký tự')
    .matches(
        /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
        'Vitamin không được chứa ký tự đặc biệt',
    );

export const schemaCreateNutrition = yup.object().shape({
    name: nameSchema,
    description: descriptionSchema,
    image: yup.mixed().required('Hình ảnh không được bỏ trống'),
    vitamin: vitaminSchema.required('Vitamin không được bỏ trống'),
    healthValue: healthValueSchema.required('Giá trị dinh dưỡng không được bỏ trống'),
});

export const schemaUpdateNutrition = yup.object().shape({
    name: nameSchema,
    description: descriptionSchema,
    vitamin: vitaminSchema.required('Vitamin không được bỏ trống'),
    healthValue: healthValueSchema.required('Giá trị dinh dưỡng không được bỏ trống'),
});