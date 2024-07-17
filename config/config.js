export const permissionsList = [
    {id: 0, title: "dashboard", key: "dashboard"},
    {id: 1, title: "admins", key: "admins"},
    {id: 2, title: "create admins", key: "create_admin"},
    {id: 3, title: "delete admin", key: "delete_admin"},
    {id: 4, title: "update admin", key: "update_admin"},
    {id: 5, title: "users", key: "users"},
    {id: 6, title: "update user", key: "update_user"},
    {id: 7, title: "delete user", key: "delete_user"},
    {id: 8, title: "blogs", key: "blogs"},
    {id: 9, title: "create blog", key: "create_blog"},
    {id: 10, title: "update blog", key: "update_blog"},
    {id: 11, title: "delete blog", key: "delete_blog"},
    {id: 12, title: "create category", key: "create_category"},
    {id: 13, title: "update category", key: "update_category"},
    {id: 14, title: "delete category", key: "delete_category"},
    {id: 15, title: "category", key: "category"},
    {id: 16, title: "products", key: "products"},
    {id: 17, title: "create product", key: "create_product"},
    {id: 18, title: "update product", key: "update_product"},
    {id: 19, title: "delete product", key: "delete_product"},
    {id: 20, title: "faqs", key: "faqs"},
    {id: 21, title: "create faq", key: "create_faq"},
    {id: 22, title: "delete faq", key: "delete_faq"},
    {id: 23, title: "update faq", key: "update_faq"},
    {id: 24, title: "roles", key: "roles"},
    {id: 25, title: "create role", key: "create_role"},
    {id: 26, title: "update role", key: "update_role"},
    {id: 27, title: "delete role", key: "delete_role"}
]
export const superAdminRole = {
    name: 'super admin',
    key: 'super_admin',
    permissions: permissionsList
}
export const superAdmin = {
    email: 'mehdifarshbaf92@gmail.com',
    password: 'Mehdi14439',
    mobile: '09039067633',
    fullname: 'Mehdi Farshbaf'
}
export const allowTypesImages = ['.jpg', '.jpeg', '.png']

export const baseURL = "https://back-shop.farshbaf-dev.ir"