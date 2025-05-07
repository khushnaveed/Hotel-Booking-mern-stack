import express from "express";
import mongoose from "mongoose";
import roomRoutes from "./routes/roomRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import { config } from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors"
import restaurantRoutes from "./routes/restaurantRoutes.js"
import { auth } from "./middlewares/authentication.js"
import Stripe from "stripe";


config();
console.clear();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",

  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],

  exposedHeaders: ["token"]
}));

const PORT = process.env.PORT;
app.use(express.json());
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


try {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "hotel-booking" })
  console.log("Data Base connected successfully!")
} catch (err) {
  console.log(err.message);
}
app.use((req, res, next) => {
  //console.log(req.url)
  next()
})
//routes

app.use("/bookings", auth, bookingRoutes);
app.use("/room", roomRoutes)
app.use("/guest", guestRoutes)
app.use('/events', eventRoutes);
app.use('/menu', restaurantRoutes);
app.post('/create-checkout-session', async (req, res) => {

  const { cartItems } = req.body;
  //console.log(cartItems)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image]
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
app.get("/checkout-session/:sessionId", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    res.json(session);
  } catch (err) {
    console.error("Error fetching session:", err.message);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});


//error handling middlewares
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ success: false, message: err.message });
});

//page not found error handler
app.use((req, res, next) => {
  //console.log(req.url, req.method)
  res
    .status(404)
    .send({ success: false, message: "No such route exist in our server!" });
});




app.listen(PORT, () => console.log("Server is running on port:", PORT));

