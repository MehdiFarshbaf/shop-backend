import * as YUP from 'yup'

export const createRoleSchema = YUP.object().shape({
    name: YUP.string().required("نام نقش الزامی است.")
})