const express = require("express");
const app = express();
const connect = require("./connections/db");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");
const paypalRoute = require("./routes/paypalRoute")

app.use(express.json());
connect();


app.use(cors());



app.use("/api/v1", authRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paypalRoute);



app.get("/", (req, res) => {
    res.send("helooo");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on port ${port} `);
});