import express from 'express';
import {alRoutes} from './routes'

const app = express();

app.use(express.json());

app.use(alRoutes)

app.listen(3333,()=> console.log("Server on in 3333"))