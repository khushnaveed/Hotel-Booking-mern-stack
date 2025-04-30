export const isAdmin = (req, res, next) => {
    // clg to see error and id
    console.log(req.guest._id.toString(), req.params.id)
    try {
        if (req.guest.role === "admin") {
            next()
        }
        //this line is bcos maybe normal guest wants to update or delete his own order--if in order[]this id exists or not
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