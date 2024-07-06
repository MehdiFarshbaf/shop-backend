import * as YUP from 'yup'

export const createFAQSchema = YUP.object().shape({
    question: YUP.string().required("سوال الزامی است."),
    answer: YUP.string().required("پاسخ الزامی است.")
})