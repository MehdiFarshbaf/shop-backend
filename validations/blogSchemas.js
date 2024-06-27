import * as Yup from 'yup'

export const createBlogSchema = Yup.object().shape({
    title: Yup.string().required("عنوان پست الزامی می باشد")
        .min(3, "عنوان پست نباید کمتر از 3 کاراکتر باشد"),
    description: Yup.string().required("توضیحات پست الزامی می باشد"),
    shortDescription: Yup.string().required("توضیحات کوتاه پست الزامی می باشد"),
})