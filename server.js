require('dotenv').config();
console.log("MONGO URI:", process.env.MONGO_URL);
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const connectdb = require('./config/db');



const CustomerRouter = require('./routes/CustomerRouter.js')
const UserRouter = require('./routes/UserRouter.js')
const MenuRouter = require('./routes/MenuRouter.js')
const OrderRouter = require('./routes/OrderRouter.js')
const PartyHallRouter = require('./routes/PartyHallRouter.js')
const DecorationRouter = require('./routes/DecorationRouter.js')
const ReservationRouter = require('./routes/ReservationRouter.js')

app.use(express.json());
app.use(cors());
app.use('/customer',CustomerRouter);
app.use('/user',UserRouter);
app.use('/menu',MenuRouter);
app.use('/order',OrderRouter);
app.use('/partyHall',PartyHallRouter);
app.use('/decoration',DecorationRouter);
app.use('/reservation',ReservationRouter);

connectdb();



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
