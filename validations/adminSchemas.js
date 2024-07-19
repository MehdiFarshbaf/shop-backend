import * as Yup from 'yup'

export const adminCreateSchema = Yup.object().shape({
    email: Yup.string().required("ایمیل برای مدیر الزامی است.").email("ایمیل وارد شده معتبر نمی باشد."),
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
        .required("کلمه عبور قبلی الزامی می باشد"),
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
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
        .required("کلمه عبور قبلی الزامی می باشد")
})

export const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
        .required("کلمه عبور قبلی الزامی می باشد"),
    newPassword: Yup.string()
        .min(4, "کلمه عبور نباید کمتر از 4 کاراکتر باشد")
        .max(255, "کلمه عبور نباید بیشتر از 255 کاراکتر باشد")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            "باید حداقل شامل 8 کاراکتر و حروف کوچک و بزرگ و اعداد باشد")
        .required("کلمه عبور قبلی الزامی می باشد"),
    confirmPassword: Yup.string().required("تکرار کلمه عبور تکراری است.").oneOf([Yup.ref('newPassword'), null], 'گذرواژه و تکرار آن تکسان نیست.')
})