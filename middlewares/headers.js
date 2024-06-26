export const headers = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next()
}