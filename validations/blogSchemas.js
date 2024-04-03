import * as Yup from 'yup'

export const createBlogSchema = Yup.object().shape({
    title: Yup.string().required("عنوان پست الزامی می باشد")
        .min(3, "عنوان پست نباید کمتر از 3 کاراکتر باشد"),
    description: Yup.string().required("توضیحات پست الزامی می باشد"),
    shortDescription: Yup.string().required("توضیحات کوتاه پست الزامی می باشد"),
    mainImage: Yup.string().required("تصویر پست الزامی می باشد"),
    writer: Yup.string().required("نام نویسنده الزامی می باشد")
        .min(3, "نام نویسنده نباید کمتر از 3 کاراکتر باشد"),
    category: Yup.string().required("دسته بندی پست الزامی می باشد")
})