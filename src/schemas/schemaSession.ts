import * as yup from 'yup';
export const schemaSession = yup.object().shape({
    name: yup
        .string()
        .required('Tên ca làm việc không được để trống')
        .min(3, 'Tên ca làm việc phải có ít nhất 3 ký tự')
        .max(50, 'Tên ca làm việc không được vượt quá 50 ký tự')
        .matches(
            /^[a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]*$/,
            'Tên thể loại không được chứa ký tự đặc biệt',
        ),
    startTime: yup
        .string()
        .required('Thời gian bắt đầu không được để trống')
        .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Thời gian bắt đầu không hợp lệ (HH:mm)',
        ),
    endTime: yup
        .string()
        .required('Thời gian kết thúc không được để trống')
        .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Thời gian kết thúc không hợp lệ (HH:mm)',
        )
        .test('is-greater', 'Thời gian kết thúc phải sau thời gian bắt đầu', function (value) {
            const { startTime } = this.parent;
            return startTime && value && startTime < value;
        }),
});