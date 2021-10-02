import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import config from './config.js';
import ContactRouter from './routers/ContactRouter.js';

const port = config.PORT;
const app = express();

const errorHandler: express.ErrorRequestHandler = 
    (err: any, req: express.Request, res: express.Response, next: express.NextFunction) =>
    {
        const status = (err.name && err.message === 'ValidationError') ? 400 : 500;
        res.status(status).send({message: err.message})
    }
const sendSPA: express.Handler = 
    (req: express.Request, res: express.Response, next: express.NextFunction) => 
    {
        res.send(path.join(__dirname, '..', '/public', '/build', 'index.html'));
    }

mongoose.connect(config.MONGODB_URL)
.then(
    () => console.log('MongoDB Connected')
)
.catch(
    error => console.log(error)
);

app.use(cors());
app.use(json());

app.use('/api/contact', ContactRouter);

app.use(express.static(path.join(__dirname, '..', '/public', '/build')), json());

app.get('*', sendSPA)

app.use(errorHandler);

app.listen(
    port, 
    () => console.log(`serve at http://localhost:${port}`)
);