import * as Yup from 'yup'

export const createProductSchema = Yup.object().shape({
    title: Yup.string().required("عنوان محصول الزامی می باشد")
        .min(4, "عنوان محصول نباید کمتر از 4 کاراکتر باشد"),
    description: Yup.string().required("توضیحات محصول الزامی می باشد")
        .min(4, "توضیحات محصول نباید کمتر از 4 کاراکتر باشد"),
    shortDescription: Yup.string().required("توضیحات کوتاه محصول الزامی می باشد")
        .min(4, "توضیحات کوتاه محصول نباید کمتر از 4 کاراکتر باشد"),
    price: Yup.number().typeError("برای قیمت مقدار عددی وارد کنید.").required("قیمت الزامی است."),
    discount: Yup.number().typeError("برای تخفیف مقدار عددی وارد کنید.").min(0, `کمترین مقدار تخفیف 0 است.`),
    quantity: Yup.number().typeError("برای تعداد مقدار عددی وارد کنید.").min(0, `کمترین مقدار تعداد 0 است.`)
})