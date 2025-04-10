import express from "express"
import mongoose from "mongoose"
import roomRoutes from "./routes/roomRoutes.js"
import { config } from "dotenv";
//npm i cors
import cors from "cors"
import eventRoutes from './routes/eventRoutes.js';

config();
console.clear()
const app = express()
app.use(cors()); // <-- Enable CORS

const PORT = process.env.PORT;
app.use(express.json())

//make mongoose connection
try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "hotel-booking" })
    console.log("Data Base connected successfully!")


} catch (err) {
    console.log(err.message)

}








//routes
app.use("/room", roomRoutes)

app.use('/events', eventRoutes);





//error handling middlewares
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ success: false, message: err.message });
});

//page not found error handler
app.use((req, res, next) => {
    res
        .status(404)
        .send({ success: false, message: "No such route exist in our server!" });
});






app.listen(PORT, () => console.log("Server is running on port:", PORT))