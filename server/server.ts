import express from 'express';
import db from './config/db';
import routes from './routes';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../client/dist'))
app.use(cookieParser());
app.use('/api', routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});