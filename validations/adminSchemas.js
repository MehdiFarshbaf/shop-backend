import * as Yup from 'yup'

export const adminCreateSchema = Yup.object().shape({
    email: Yup.string().required("ایمیل برای مدیر الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
    password: Yup.string().required("گذرواژه الزامی است."),
    mobile: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
    fullname: Yup.string().required("نام مدیر الزامی است.")
})


export const adminUpdateSchema = Yup.object().shape({
    email: Yup.string().required("ایمیل برای مدیر الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
    mobile: Yup.string().matches(/^(\+98?)?{?(0?9[0-9]{9,9}}?)$/, 'شماره موبایل معتبر نیست').required('این فیلد الزامی می باشد.').length(11, 'طول شماره تلفن باید 11 کاراکتر باشد.'),
    fullname: Yup.string().required("نام مدیر الزامی است.")
})

export const loginAdminSchema = Yup.object().shape({
    email: Yup.string().required("ایمیل برای مدیر الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
    password: Yup.string().required("گذرواژه الزامی است."),
})