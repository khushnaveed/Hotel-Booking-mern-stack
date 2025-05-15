export const isAdmin = (req, res, next) => {
    console.log(req.guest._id.toString(), req.params.id)
    try {
        if (req.guest.role === "admin") {
            next()
        }
        else if (req.guest.orders.includes(req.params.id) ||
            req.guest._id.toString() === req.params.id
) {
            next()
        }
        else {
            throw new Error("you are not authorized!")
        }
    } catch (err) {
        next(err)
    }
}