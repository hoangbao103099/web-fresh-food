export const validateParam = (schema, name) => {
    return (req, res, next) => {
        const validateResult = schema.validate({ param: req.params[name] })

        if (validateResult.error) {
            // if param have error
            res.status(400)
            throw new Error('Invalid params')
        } else {
            if (!req.value) req.value = {}
            if (!req.value['params']) req.value.params = {}

            req.value.params[name] = req.params[name]
            next()
        }
    }
}
