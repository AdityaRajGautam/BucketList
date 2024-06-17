import express from 'express'
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import placesRoutes from './routes/places-routes.js'
import usersRoutes from './routes/users-routes.js'

const app = express();

dotenv.config();

connectDB();

app.use(bodyParser.json());
app.use(express.json())

app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes)

app.listen(5000,()=>{
    console.log('server is listening to port 5000...')
})