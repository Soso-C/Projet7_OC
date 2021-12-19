// Middleware qui verifie si il y a des erreurs ou pas dans la req body de l'user si !err alors on next si non on return l'err.
const validation = (schema) => async (req, res, next) => {

    const body = req.body

    try {
        await schema.validate(body)
        next()
    } catch (err) {
        return res.status(400).json({ err })
    }

}





module.exports = validation