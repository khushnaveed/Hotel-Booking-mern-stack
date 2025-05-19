import jwt from "jsonwebtoken"
import GuestModel from "../models/guestSchema.js"
export const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (token) {

            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (!decode) throw new Error("invalid token");
            const guest = await GuestModel.findById(decode._id).populate("bookings")
            req.guest = guest;
            next();
        } else {
            res.send({ success: false, message: "token is required!" });
        }
    } catch (err) {
        next(err);
    }
};