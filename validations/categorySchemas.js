import * as Yup from 'yup'

export const createCategorySchema = Yup.object().shape({
    name: Yup.string().required("عنوان دسته بندی الزامی می باشد")
        .min(3, "عنوان دسته بندی نباید کمتر از 3 کاراکتر باشد"),

})