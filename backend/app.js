import express from 'express'
import placesRoutes from './routes/places-routes.js'
import usersRoutes from './routes/users-routes.js'

const app = express();

app.use(express.json())

app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes)

app.listen(5000,()=>{
    console.log('server is listening to port 5000...')
})